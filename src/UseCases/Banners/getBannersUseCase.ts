import { inject, singleton } from "tsyringe/dist/decorators";
import { outputBannerDTO } from "../../DTO/Banners/outputDTO";
import { BannerUseCaseInterface } from "../../Interfaces/Banners/IGetbanner";
import { BannerRepository } from "../../Repositories/Banners";

@singleton()
export class BannerUseCaseGet implements BannerUseCaseInterface{
     constructor(
        //@ts-ignore
        @inject(BannerRepository)
        private bannersRepo: BannerRepository
     ){

     }
async findAll(): Promise<outputBannerDTO[] | null> {
    return await this.bannersRepo.findAll(1000)
}
async findAllPublic(): Promise<outputBannerDTO[] | null> {
    return await this.bannersRepo.findAll()
}
}