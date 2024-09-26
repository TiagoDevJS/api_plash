import { createBannerDTO } from "../../DTO/Banners/inputDTO"

export interface BannerUseCasePostInterface {
    create(input:createBannerDTO):Promise<string | null>
   
}