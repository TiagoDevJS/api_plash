import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { UpdateSonsorsUseCaseInterface } from "../../Interfaces/Sponsors/UpdateSponsorsInterface";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import logger from "../../adapters/winstomLogger";
import { Sponsors } from "../../Entities/sponsors";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
/**
 * @class SponsorsUseCaseUpdate
 * @description Caso de uso responsável por atualizar patrocinadores do sistema.
 */
@injectable()
export class SponsorsUseCaseUpdate implements UpdateSonsorsUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}

  /**
   * @method execute
   * @description Atualiza os dados de um patrocinador no banco de dados com base no ID fornecido.
   * 
   * @param {number} id - ID do patrocinador a ser atualizado.
   * @param {SponsorsInputDTO} input - Dados atualizados para o patrocinador.
   * @returns {Promise<string | null>} Uma mensagem de sucesso ou null se a atualização falhar.
   * 
   * @throws {NotFoundError} Se o patrocinador não for encontrado.
   * @throws {BadRequestError} Se ocorrer algum erro durante a atualização.
   */
  async execute(id: number, input: SponsorsInputDTO): Promise<string | null> {
    const existSponsors = await this.sponsorsRepo.findID(id);
    if (!existSponsors) {
      logger.warn(`Patrocinador com ID ${id} não encontrado`);
      throw new NotFoundError('Patrocinador não encontrado');
    }

    try {
      const data = Sponsors.create(input);
      const update = await this.sponsorsRepo.update(existSponsors.id, data);
      logger.info(`Patrocinador com ID ${id} atualizado com sucesso!`);
      return update;
    } catch (error) {
      logger.error(`Erro ao atualizar o patrocinador com ID ${id}: ${error}`);
      throw new BadRequestError('Erro ao chamar repositório de patrocinadores');
    }
  }
}
