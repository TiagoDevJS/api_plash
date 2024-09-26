import { QueryEvents } from "../../DTO/Events/inputDTO";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface EventsControllerInterface {
    create(input:any):Promise<HttpResponse<unknown>>
    update(id:number,input:any):Promise<HttpResponse<unknown>>
    delete(id:number):Promise<HttpResponse<unknown>>
    findID(id:number):Promise<HttpResponse<unknown>>
    findAll(query:QueryEvents):Promise<HttpResponse<unknown>>
    removeSponsorByEvents(eventID:number, sponsorID:number):Promise<HttpResponse<unknown>>
  
}