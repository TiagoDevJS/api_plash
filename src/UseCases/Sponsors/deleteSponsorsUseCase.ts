import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import logger from "../../adapters/winstomLogger";
import { Sponsors } from "../../Entities/sponsors";
import { DeleteSponsorsInterface } from "../../Interfaces/Sponsors/DeleteSponsorsUseCaseInterface";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class SponsorsUseCaseDelete implements DeleteSponsorsInterface {
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}
  // Funçao responsavel por enviar os dados para deletar  patronicadores no banco de dados
  async execute(id:number): Promise<boolean> {
    const existSponsors = await this.sponsorsRepo.findID(id);
    if (!existSponsors) {
      logger.warn(`Patrociandor não encontrado!`);
      throw new NotFoundError('Patrocinador não encontrado')
    }
    try {
 
        
    
      const deleteSponsor = await this.sponsorsRepo.delete(existSponsors?.id);
      logger.info(`Patrociandor encontrado ${id}!`);
      return true;
    } catch (error) {
      logger.error(`Erro ao chamar repositorio patrocinador  ${error}`);
      throw new BadRequestError('Erro ao chamar respositorio de patrocinadores')
    }
  }
}
