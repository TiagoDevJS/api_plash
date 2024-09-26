import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import { GetSponsorsInterface } from "../../Interfaces/Sponsors/GetSponsorInterface";
import { SponsorsOutputDTO } from "../../DTO/Sponsors/outputDTO";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class SponsorsUseCaseGet implements GetSponsorsInterface{
   constructor(
    //@ts-ignore
      @inject(SponsorsRepository)
      private readonly sponsorsRepo:SponsorsRepository
   ){}
     // Funçao responsavel por enviar os dados para buscar  patronicadores no banco de dados
  async findAll(): Promise<SponsorsOutputDTO[]> {
    try {
      const sponsors = await this.sponsorsRepo.findAll()
      return sponsors
    } catch (error) {
      throw new BadRequestError(`Erro ao buscar patrocinadores`)
    }
      
  }
    // Funçao responsavel por enviar os dados para buscar ID  patronicadores no banco de dados
  async findID(id: number): Promise<SponsorsOutputDTO | null> {
      const existSponsors = await this.sponsorsRepo.findID(id)
      if(!existSponsors){
        logger.warn(`Patrocinador nao encontrado`)
        throw new  NotFoundError('Patrocinador nao encontrado')
      }
      try {
        return existSponsors
      } catch (error) {
        logger.warn(`Erro ao chamar repository patrocinadores: ${error}`)
        throw new  BadRequestError('Erro ao chamar repositorio de patrocinadores')
      }
      
  }
}