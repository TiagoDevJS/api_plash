import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { UpdateSonsorsUseCaseInterface } from "../../Interfaces/Sponsors/UpdateSponsorsInterface";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import logger from "../../adapters/winstomLogger";
import { Sponsors } from "../../Entities/sponsors";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class SponsorsUseCaseUpdate implements UpdateSonsorsUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}
    // Funçao responsavel por enviar os dados para atualizar  patronicadores no banco de dados
  async execute(id: number, input: SponsorsInputDTO): Promise<string | null> {
    const existSponsors = await this.sponsorsRepo.findID(id);
    if (!existSponsors) {
        logger.warn(`Patrocinador nao encontrado`)
        throw new  NotFoundError('Patrocinador nao encontrado')
    
    }
    try {
 
        
      const data = Sponsors.create(input);
      const update = await this.sponsorsRepo.update(existSponsors?.id, data);
      logger.info(`Patrociandor encontrado ${id}!`);
      return update;
    } catch (error) {
      logger.error(`Erro ao chamar repositorio patrocinador  ${error}`);
      throw new BadRequestError('Erro ao chamar repositorio de patrocinadores')
    }
  }
}
