import { inject, injectable } from "tsyringe/dist/decorators";
import { EventsInputDTO } from "../../DTO/Events/inputDTO";
import { CretateEventsUseCaseInterface } from "../../Interfaces/Events/CreateEventsUseCaseInterface";
import { EventsRepository } from "../../Repositories/Events";
import { Events } from "../../Entities/events";
import { BadRequestError } from "../../handleError/errors";
import logger from "../../adapters/winstomLogger";
@injectable()
export class EventsCreateUseCase implements CretateEventsUseCaseInterface {
    constructor(
        //@ts-ignore
        @inject(EventsRepository)
        private readonly eventsRepo:EventsRepository
    ){}
    async execute(input: EventsInputDTO): Promise<string | null> {
        try {
            const data = Events.create(input)
            const create = await this.eventsRepo.create(data)
            return create
            
        } catch (error) {
            logger.error(`Erro ao criar evento: ${error}`)
            throw new BadRequestError(`Erro ao criar evento`)
        }
        
    }
}