import { inject, injectable } from "tsyringe/dist/decorators";
import { EventsInputDTO } from "../../DTO/Events/inputDTO";
import { UpdateEventsUseCaseInterface } from "../../Interfaces/Events/UpdateEventsUseCaseInterface";
import { EventsRepository } from "../../Repositories/Events";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { Events } from "../../Entities/events";
import logger from "../../adapters/winstomLogger";

@injectable()
export class EventsUpdateUseCase implements UpdateEventsUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(EventsRepository)
    private readonly eventsRepo: EventsRepository
  ) {}
  async execute(id: number, input: EventsInputDTO): Promise<string | null> {
    const existEvent = await this.eventsRepo.findID(id);
    if (!existEvent) {
      throw new NotFoundError(`Evento não encontrado`);
    }
    try {
      const data = Events.create(input);
      const update = await this.eventsRepo.update(existEvent?.id, data);
      return update;
    } catch (error) {
      logger.error(`Erro ao atualizar o evento :${error}`);
      throw new BadRequestError(`Erro ao atualizar o evento`);
    }
  }
}
