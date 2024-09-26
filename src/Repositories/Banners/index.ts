import { BannerRepositoryInterface } from "../../Interfaces/Banners/IBannersRepository";
import prisma from "../../Frameworks/server/prisma";
import { createBannerDTO } from "../../DTO/Banners/inputDTO";
import { outputBannerDTO } from "../../DTO/Banners/outputDTO";
import { singleton } from "tsyringe/dist/decorators";
@singleton()
export class BannerRepository implements BannerRepositoryInterface{
    private prisma = prisma
    constructor(){
        this.prisma = prisma

    }
   async findAll(take?:number): Promise<outputBannerDTO[] | null> {
    const banners = await prisma?.banners.findMany({
        take: take ? take : 4
    });

    return banners ? banners :  null;
    }
    async findID(id: number): Promise<outputBannerDTO | null> {
        const banner = await this.prisma?.banners.findUnique({
            where:{
                id
            }
        }) 
        return banner?.id ? banner: null
    }
    async create(input:createBannerDTO): Promise<any> {
        const data = {
            name:input.name,
            cover: input.cover
        }
        const banner = await this.prisma?.banners.create({
            data
        })
        return banner?.id ?  'Banner criado com sucesso' : null
    }
    async delete(id: number): Promise<string | null> {
         const existBanner = await this.findID(id)
         if(!existBanner){
            return null
         }
        const banner = await this.prisma?.banners.delete({
            where:{
                id
            }
        })
        return 'Banner deletado  com sucesso!' 
    }

}