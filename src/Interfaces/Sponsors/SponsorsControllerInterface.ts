import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface SponsorsControllerInterface {
    getAllSponsors():Promise<HttpResponse<unknown>>
    getIDSponsors(id:number):Promise<HttpResponse<unknown>>
    create(input:SponsorsInputDTO):Promise<HttpResponse<unknown>>
    update(id:number,input:SponsorsInputDTO):Promise<HttpResponse<unknown>>
    delete(id:number):Promise<HttpResponse<unknown>>
}