import { createBannerDTO } from "../../DTO/Banners/inputDTO"
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos"

export interface BannerControllerInterface {
    findAll():Promise<HttpResponse<unknown>>
    publicFindAll():Promise<HttpResponse<unknown>>
    create(input:createBannerDTO):Promise<HttpResponse<unknown>>
    delete(id:number):Promise<HttpResponse<unknown>>

}