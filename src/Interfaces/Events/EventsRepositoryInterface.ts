import { QueryEvents } from "../../DTO/Events/inputDTO";
import { EventsOutputtDTO } from "../../DTO/Events/outputDTO";
import { Events } from "../../Entities/events";

export interface EventsRepositoryInteface {
    findAll(query:QueryEvents):Promise<EventsOutputtDTO[]>
    findID(id:number):Promise<EventsOutputtDTO | null>
    create(input: Events):Promise<string | null>
    update(id:number, input: Events):Promise<string | null>
    delete(id:number):Promise<boolean>
    removeSponsorEvent(eventID:number, sponsorID:number):Promise<boolean>

}