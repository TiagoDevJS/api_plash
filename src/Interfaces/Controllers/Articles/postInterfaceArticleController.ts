import { ArticleProps } from "../../../Entities/article"
import { HttpResponse } from "../../../Frameworks/Controllers/Helpers/protocolos"


export interface IArticleControllerInterface {
    create(input:ArticleProps):Promise<HttpResponse<unknown>>
    update(id:number,input:ArticleProps):Promise<HttpResponse<unknown>>
    delete(id:number):Promise<HttpResponse<unknown>>
    findAll(query:any):Promise<HttpResponse<unknown>>
    findID(id:number):Promise<HttpResponse<unknown>>
    

}