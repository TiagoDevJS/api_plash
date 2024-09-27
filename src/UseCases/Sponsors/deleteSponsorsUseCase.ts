import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import logger from "../../adapters/winstomLogger";
import { Sponsors } from "../../Entities/sponsors";
import { DeleteSponsorsInterface } from "../../Interfaces/Sponsors/DeleteSponsorsUseCaseInterface";
import { BadRequestError, NotFoundError } from "../../handleError/errors";


/**
 * @class SponsorsUseCaseDelete
 * @description Caso de uso responsável por deletar patrocinadores do sistema.
 */
@injectable()
export class SponsorsUseCaseDelete implements DeleteSponsorsInterface {
  /**
   * @constructor
   * @description Injeta o repositório de patrocinadores necessário para realizar a exclusão.
   * 
   * @param {SponsorsRepository} sponsorsRepo - Repositório responsável pela manipulação dos dados dos patrocinadores.
   */
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}

  /**
   * @method execute
   * @description Deleta um patrocinador com base no ID fornecido.
   * 
   * @param {number} id - ID do patrocinador a ser deletado.
   * @returns {Promise<boolean>} Retorna true se o patrocinador for deletado com sucesso.
   * 
   * @throws {NotFoundError} Caso o patrocinador não seja encontrado.
   * @throws {BadRequestError} Caso ocorra um erro ao deletar o patrocinador.
   */
  async execute(id: number): Promise<boolean> {
    // Verifica se o patrocinador existe
    const existSponsors = await this.sponsorsRepo.findID(id);
    if (!existSponsors) {
      //
      logger.warn(`Patrocinador com ID ${id} não encontrado!`);
      throw new NotFoundError('Patrocinador não encontrado');
    }

    try {
      // Tenta deletar o patrocinador
      const deleteSponsor = await this.sponsorsRepo.delete(existSponsors.id);

      if (!deleteSponsor) {
        logger.warn(`Falha ao deletar patrocinador com ID ${id}`);
        return false;
      }

      logger.info(`Patrocinador com ID ${id} deletado com sucesso!`);
      return true;
    } catch (error: any) {
      logger.error(`Erro ao deletar patrocinador com ID ${id}: ${error.message}`);
      throw new BadRequestError('Erro ao chamar repositório de patrocinadores');
    }
  }
}
