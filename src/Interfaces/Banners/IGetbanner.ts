import { outputBannerDTO } from "../../DTO/Banners/outputDTO"

export interface BannerUseCaseInterface {
    findAll():Promise<outputBannerDTO[] | null>
    findAllPublic():Promise<outputBannerDTO[] | null>
}