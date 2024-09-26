import { QueryMagazine } from "../../DTO/Magazines/inputDTO";
import { Magazine } from "../../Entities/magazine";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface MagazineInterfaceController {
    create(input:Magazine):Promise<HttpResponse<unknown>> 
    findAll(query:QueryMagazine):Promise<HttpResponse<unknown>> 
    findID(id:number):Promise<HttpResponse<unknown>> 
    findIDPublic(id:number):Promise<HttpResponse<unknown>> 
    update(id:number, input:Magazine):Promise<HttpResponse<unknown>> 
    delete(id:number):Promise<HttpResponse<unknown>> 
    removeEmployeeMagazine(magazineId:number, employeId:number):Promise<HttpResponse<unknown>> 
}