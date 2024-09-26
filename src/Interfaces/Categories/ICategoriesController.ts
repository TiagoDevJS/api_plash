import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos"

export interface ICategoriesController{
    create(name:string):Promise<HttpResponse<unknown>>
    update(id:number,name:string):Promise<HttpResponse<unknown>>
    delete(id:number):Promise<HttpResponse<unknown>>
    findAll():Promise<HttpResponse<unknown>>
    findID(id:number):Promise<HttpResponse<unknown>>
}