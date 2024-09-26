import { inject, injectable } from "tsyringe/dist/decorators";
import { EventsOutputtDTO } from "../../DTO/Events/outputDTO";
import { GetEventsUseCaseInterface } from "../../Interfaces/Events/GetEventsUseCaseInterface";
import { EventsRepository } from "../../Repositories/Events";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { QueryEvents } from "../../DTO/Events/inputDTO";

@injectable()
export class EventsGetUseCase implements GetEventsUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(EventsRepository)
    private readonly eventsRepo: EventsRepository
  ) {}
  async findAll(query: QueryEvents): Promise<EventsOutputtDTO[]> {
    try {
      const queryParams = this.prepareQuery(query);
      const findall = await this.eventsRepo.findAll(queryParams);
      return findall;
    } catch (error) {
      logger.error(`Erro ao buscar eventos `);
      throw new BadRequestError(`Erro ao Buscar eventos`);
    }
  }
  async findID(id: number): Promise<EventsOutputtDTO | null> {
    const existEvent = await this.eventsRepo.findID(id);

    if (!existEvent) {
      logger.info(`Evento com ID ${id} não encontrado!`);
      throw new NotFoundError(`Evento com ID ${id} não encontrado!`);
    }
    try {
      return existEvent;
    } catch (error) {
      logger.error(`Erro ao buscar evento com ID ${id}: ${error}`);
      throw new BadRequestError(`Erro interno no sistema!`);
    }
  }
  private prepareQuery(query: Partial<QueryEvents>): QueryEvents {
    const take = Number(query.take) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * take;

    const queryParams: QueryEvents = {
      take: take as number,
      skip: skip as number,
    };
    // Adiciona os campos somente se eles existirem na consulta original
    if (query.name) queryParams.name = query.name;
    if (query.email) queryParams.email = query.email;
    if (query.organizer) queryParams.organizer = query.organizer;

    return queryParams;
  }
}
