import { container } from "tsyringe";
import { BannerControllerInterface } from "../../../../Interfaces/Banners/IBannerController";
import {  BannerUseCaseGet } from "../../../../UseCases/Banners/getBannersUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { BadRequest, notFound, ok, serverError } from "../../Helpers/helperError";
import { BannerUseCasePost } from "../../../../UseCases/Banners/createBannersUseCase";
import { createBannerDTO } from "../../../../DTO/Banners/inputDTO";



export class BannerController implements BannerControllerInterface {

  private bannerUseCaseGet: BannerUseCaseGet;
  private bannerUseCasePost: BannerUseCasePost;


     constructor(){
         this.bannerUseCaseGet = container.resolve(BannerUseCaseGet),
         this.bannerUseCasePost = container.resolve(BannerUseCasePost)
     }
    async findAll(): Promise<HttpResponse<unknown>> {
        try {
            const data = await this.bannerUseCaseGet.findAll()
            if(!data){
                return notFound('Banners não encontrados')
            }
            return ok(data)
        } catch (error) {
            return serverError()
        }
    }
    async publicFindAll(): Promise<HttpResponse<unknown>> {
        try {
            const data = await this.bannerUseCaseGet.findAllPublic()
            if(!data){
                return notFound('Banners não encontrados')
            }
            return ok(data)
        } catch (error) {
            return serverError()
        }
    }
    async create(input:createBannerDTO): Promise<HttpResponse<unknown>> {
        try {
            const data = await this.bannerUseCasePost.create(input)
            if(!data){
                return BadRequest('Erro ao criar o banner encontrados')
            }
            return ok(data)
        } catch (error) {
            return serverError()
        }
    }
    async delete(id: number): Promise<HttpResponse<unknown>> {
        throw''
    }
}