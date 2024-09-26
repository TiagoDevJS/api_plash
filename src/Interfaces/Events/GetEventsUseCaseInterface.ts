import { QueryEvents } from "../../DTO/Events/inputDTO";
import { EventsOutputtDTO } from "../../DTO/Events/outputDTO";

export interface GetEventsUseCaseInterface  {
    findAll(query:QueryEvents):Promise<EventsOutputtDTO[]>
    findID(id:number):Promise<EventsOutputtDTO | null>
}