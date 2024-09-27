import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { Magazine } from "../../Entities/magazine";
import { CreateMagazineInterface } from "../../Interfaces/Magazines/CreateMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines/index";
import logger from "../../adapters/winstomLogger";
import { createMagzineInputDTO } from "../../DTO/Magazines/inputDTO";
import { BadRequestError } from "../../handleError/errors";

/**
 * @class CreateMagazineUseCase
 * @implements {CreateMagazineInterface}
 * @description Caso de uso responsável pela criação de uma revista no sistema.
 */
@injectable()
export class CreateMagazineUseCase implements CreateMagazineInterface {
  /**
   * @constructor
   * @description Injeta o repositório de revistas necessário para criar uma nova revista.
   *
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}

  /**
   * @method create
   * @description Executa o processo de criação de uma nova revista no sistema.
   *
   * @param {createMagzineInputDTO} input - Dados da nova revista a ser criada.
   * @returns {Promise<string | any>} Retorna os dados da revista criada ou uma mensagem de erro.
   *
   * @throws {BadRequestError} Caso ocorra um erro durante a criação da revista.
   */
  async create(input: createMagzineInputDTO): Promise<string | any> {
    try {
      // Cria uma nova instância da revista com os dados fornecidos
      const data = Magazine.create(input);

      // Chama o repositório para criar a revista no banco de dados
      const magazine = await this.magazineRepo.create(data);

      return magazine;
    } catch (error) {
      logger.warn(`Erro ao chamar repositório de revistas: ${error}`);
      throw new BadRequestError("Erro ao chamar repositório de revistas");
    }
  }
}
