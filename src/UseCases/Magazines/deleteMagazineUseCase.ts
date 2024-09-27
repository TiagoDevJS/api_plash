import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { MagazineDeleteInterface } from "../../Interfaces/Magazines/DeleteMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class MagazineUseCaseDelete
 * @implements {MagazineDeleteInterface}
 * @description Caso de uso responsável por deletar revistas do sistema.
 */
@injectable()
export class MagazineUseCaseDelete implements MagazineDeleteInterface {
  /**
   * @constructor
   * @description Injeta o repositório de revistas necessário para deletar uma revista do sistema.
   * 
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}

  /**
   * @method delete
   * @description Executa o processo de deleção de uma revista.
   * 
   * @param {number} id - ID da revista a ser deletada.
   * @returns {Promise<string | null>} Retorna uma mensagem de sucesso se a deleção for bem-sucedida; caso contrário, retorna null.
   * 
   * @throws {NotFoundError} Caso a revista não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro durante o processo de deleção.
   */
  async delete(id: number): Promise<string | null> {
    logger.info("Iniciando UseCase deletar revistas");
    const existMagazine = await this.magazineRepo.findID(id);
    
    if (!existMagazine) {
      logger.warn(`Revista não encontrada`);
      throw new NotFoundError("Revista não encontrada");
    }

    try {
      const deleteMagazine = await this.magazineRepo.delete(existMagazine.id);
      return deleteMagazine;
    } catch (error) {
      logger.error(`Erro use case ${error}`);
      throw new BadRequestError("Erro ao chamar repositório de revistas");
    }
  }
}
