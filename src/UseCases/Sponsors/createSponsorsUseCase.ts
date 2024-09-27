import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { CreateSponsorsInterface } from "../../Interfaces/Sponsors/CreateSponsorsInterface";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import { Sponsors } from "../../Entities/sponsors";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, Conflict } from "../../handleError/errors";

/**
 * @class SponsorUseCaseCreate
 * @description Caso de uso responsável por criar novos patrocinadores no sistema.
 */
@injectable()
export class SponsorUseCaseCreate implements CreateSponsorsInterface {
  /**
   * @constructor
   * @description Injeta o repositório de patrocinadores necessário para realizar a criação.
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
   * @description Cria um novo patrocinador no sistema com base nos dados fornecidos.
   * 
   * @param {SponsorsInputDTO} input - Dados de entrada do patrocinador.
   * @returns {Promise<string | null>} Retorna o ID do patrocinador criado ou null em caso de erro.
   * 
   * @throws {Conflict} Caso o email já esteja cadastrado.
   * @throws {BadRequestError} Caso ocorra um erro ao chamar o repositório de patrocinadores.
   */
  async execute(input: SponsorsInputDTO): Promise<string | null> {
    // Verifica se o patrocinador já existe pelo email
    const sponsorsExist = await this.sponsorsRepo.findByEmail(input.email);
    if (sponsorsExist) {
      logger.info(`Erro ao cadastrar novo patrocinador. Email ${input.email} já cadastrado!`);
      throw new Conflict("Error: Email já cadastrado no sistema");
    }

    try {
      // Cria a entidade de patrocinador com base nos dados de entrada
      const data = Sponsors.create(input);
      
      // Persiste o novo patrocinador no banco de dados
      const newSponsorId = await this.sponsorsRepo.create(data);
      
      // Log de sucesso
      logger.info(`Patrocinador cadastrado com sucesso: ${newSponsorId}`);
      return newSponsorId;
    } catch (error: any) {
      // Log detalhado do erro
      logger.error(`Erro ao cadastrar novo patrocinador: ${error.message}`);
      throw new BadRequestError("Erro ao chamar repositorio de patrocinadores");
    }
  }
}
