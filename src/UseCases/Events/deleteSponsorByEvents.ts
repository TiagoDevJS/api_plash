import { inject, injectable } from "tsyringe/dist/decorators";
import { DeleteSponsorEventsUseCaseInterface } from "../../Interfaces/Events/DeleteSponsorEventsUseCase";
import { EventsRepository } from "../../Repositories/Events";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
@injectable()
//Usecase para remover patrocinador do evento 
export class DeleteSponsorEventsUseCase
  implements DeleteSponsorEventsUseCaseInterface
{
  constructor(
    //@ts-ignore
    @inject(EventsRepository)
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly eventsRepo: EventsRepository,
    private readonly sponsorsRepo: SponsorsRepository
  ) {}
  // Funçao que remove um patrocinador de um evento 
  async execute(eventID: number, sponsorID: number): Promise<boolean> {
    //Verifica se o patrocinador existe no banco de dados
    const existSponsors = await this.sponsorsRepo.findID(sponsorID);
  //Verifica se o evento existe no banco de dados
    const existEvents = await this.eventsRepo.findID(eventID);
    if (!existEvents || !existSponsors) {
      logger.error(
        `Erro evento nbão encontrado ou patrocinador nao encontrado!`
      );
      //Retorna um erro notfound caso nao encontre nenhum dos procurados
      throw new NotFoundError(
        `Erro evento não encontrado ou patrocinador nao encontrado!`
      );
    }

    try {
        //Chama o repository para  remover o patrocinador do evento 
      await this.eventsRepo.removeSponsorEvent(
        existEvents?.id as number,
        existSponsors?.id as number
      );
      return true;
    } catch (error) {
      logger.error(`Erro ao deletar patrocinador do evento`);
      //Chama um erro caso falhar a remoçao do evento 
      throw new BadRequestError(`Erro ao deletar patrocinador do evento !`);
    }
  }
}
