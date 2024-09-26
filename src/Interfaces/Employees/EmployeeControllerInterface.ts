import { Employee } from "../../Entities/employee";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface EmployeeControllerInterface {
    create(input:Employee): Promise<HttpResponse<unknown>>
    update(id:number,input:Employee): Promise<HttpResponse<unknown>>
    delete(id:number): Promise<HttpResponse<unknown>>
    findAll(query:any): Promise<HttpResponse<unknown>>
    findID(id:number): Promise<HttpResponse<unknown>>
    
}