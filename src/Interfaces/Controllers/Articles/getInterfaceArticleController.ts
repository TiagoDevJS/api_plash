import { HttpResponse } from "../../../Frameworks/Controllers/Helpers/protocolos"

export interface IGetControllerArticleInterface {
  
    getArticleID(id:string):Promise<HttpResponse<unknown>>
    getArticlesMostRead():Promise<HttpResponse<unknown>>
    getArticlesRecommended():Promise<HttpResponse<unknown>>
    getAarticlesMostView():Promise<HttpResponse<unknown>>
    getAarticlesFree():Promise<HttpResponse<unknown>>
    getAarticlesTrend():Promise<HttpResponse<unknown>>

}