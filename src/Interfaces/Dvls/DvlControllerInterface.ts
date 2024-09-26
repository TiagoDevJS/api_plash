import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface DvlControllerInterface {
    update(ids:number[],paidOut:number):Promise<HttpResponse<unknown>>
    findAll():Promise<HttpResponse<unknown>>
    findID(id:number):Promise<HttpResponse<unknown>>
}