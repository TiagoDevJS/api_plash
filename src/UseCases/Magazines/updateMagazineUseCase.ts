import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { Magazine } from "../../Entities/magazine";
import { MagazineUpdateInterface } from "../../Interfaces/Magazines/UpdateMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";


/**
 * @class MagazineUseCaseUpdate
 * @description Caso de uso responsável por atualizar as informações de uma revista no sistema.
 */
@injectable()
export class MagazineUseCaseUpdate implements MagazineUpdateInterface {
  /**
   * @constructor
   * @description Injeta o repositório de revistas necessário para realizar a atualização das revistas.
   * 
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}

  /**
   * @method execute
   * @description Atualiza as informações de uma revista existente com base no ID fornecido e nos dados de entrada.
   * 
   * @param {number} id - ID da revista a ser atualizada.
   * @param {Magazine} input - Dados atualizados da revista.
   * @returns {Promise<string | null>} Retorna uma mensagem de sucesso ou null se não for encontrado.
   * 
   * @throws {NotFoundError} Caso a revista não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro ao chamar o repositório de revistas.
   */
  async execute(id: number, input: Magazine): Promise<string | null> {
    const existMagazine = await this.magazineRepo.findID(id);
    if (!existMagazine) {
      logger.warn(`Revista não encontrada`);
      throw new NotFoundError("Revista não encontrada");
    }

    try {
      const data = Magazine.create(input);
      const update = await this.magazineRepo.update(existMagazine.id, data);
      return update;
    } catch (error) {
      logger.error(`Erro use case ${error}`);
      throw new BadRequestError("Erro ao chamar repositório de revistas");
    }
  }
}
