import { createBannerDTO } from "../../DTO/Banners/inputDTO"
import { outputBannerDTO } from "../../DTO/Banners/outputDTO"

export interface BannerRepositoryInterface{
    findAll():Promise<outputBannerDTO[] | null>
    findID(id:number):Promise<outputBannerDTO | null>
    create(input:createBannerDTO):Promise<string | null>
  
    delete(id:number):Promise<string | null>
}