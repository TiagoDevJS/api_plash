import { inject, singleton } from "tsyringe/dist/decorators";
import { createBannerDTO } from "../../DTO/Banners/inputDTO";
import { BannerUseCasePostInterface } from "../../Interfaces/Banners/IPostBanners";
import { BannerRepository } from "../../Repositories/Banners";


@singleton()
export class BannerUseCasePost  implements BannerUseCasePostInterface{
    constructor(
        //@ts-ignore
        @inject(BannerRepository)
        private readonly bannerRepo:BannerRepository
    ){

    }
    async create(input: createBannerDTO): Promise<string | null> {
        const data = await this.bannerRepo.create(input)
        return data
    }
}