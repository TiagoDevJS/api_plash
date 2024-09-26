import { inject, injectable } from "tsyringe/dist/decorators";
import { DeleteEventsUseCaseInterface } from "../../Interfaces/Events/DeleteEventsUseCaseInterface";
import { EventsRepository } from "../../Repositories/Events";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class EventsDeleteUseCase implements DeleteEventsUseCaseInterface {
    constructor(
        //@ts-ignore
        @inject(EventsRepository)
        private readonly eventsRepo:EventsRepository
    ){}
   async  execute(id: number): Promise<boolean> {
      const existEvent = await this.eventsRepo.findID(id)
      if(!existEvent){
        logger.info(`Evento não encontrado`)
        throw new NotFoundError(`Evento não encontrado`)
      }
        try {
             await this.eventsRepo.delete(existEvent.id)
             return true
            
        } catch (error) {
            logger.error(`Erro ao deletar o evento ${error}`)
            throw new BadRequestError(`Erro ao deletar o evento`)
        }
    }
}