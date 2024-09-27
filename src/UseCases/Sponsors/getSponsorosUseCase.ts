import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import { GetSponsorsInterface } from "../../Interfaces/Sponsors/GetSponsorInterface";
import { SponsorsOutputDTO } from "../../DTO/Sponsors/outputDTO";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class Sponsors UseCase GET
 * @description Caso de uso responsável por buscar patrocinadores do sistema.
 */
@injectable()
export class SponsorsUseCaseGet implements GetSponsorsInterface {
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}

  /**
   * @method findAll
   * @description Retorna todos os patrocinadores do banco de dados.
   * 
   * @returns {Promise<SponsorsOutputDTO[]>} Uma lista de patrocinadores.
   * 
   * @throws {BadRequestError} Caso ocorra algum erro durante a busca.
   */
  async findAll(): Promise<SponsorsOutputDTO[]> {
    try {
      const sponsors = await this.sponsorsRepo.findAll();
      return sponsors;
    } catch (error) {
      logger.error(`Erro ao buscar patrocinadores: ${error}`);
      throw new BadRequestError(`Erro ao buscar patrocinadores`);
    }
  }

  /**
   * @method findID
   * @description Busca um patrocinador específico pelo ID.
   * 
   * @param {number} id - O ID do patrocinador a ser buscado.
   * @returns {Promise<SponsorsOutputDTO | null>} O patrocinador encontrado ou null se não existir.
   * 
   * @throws {NotFoundError} Se o patrocinador não for encontrado.
   * @throws {BadRequestError} Se houver erro ao chamar o repositório.
   */
  async findID(id: number): Promise<SponsorsOutputDTO | null> {
    const existSponsors = await this.sponsorsRepo.findID(id);
    
    if (!existSponsors) {
      logger.warn(`Patrocinador com ID ${id} não encontrado`);
      throw new NotFoundError('Patrocinador não encontrado');
    }
    
    try {
      return existSponsors;
    } catch (error) {
      logger.error(`Erro ao chamar repositório de patrocinadores: ${error}`);
      throw new BadRequestError('Erro ao buscar patrocinador no repositório');
    }
  }
}