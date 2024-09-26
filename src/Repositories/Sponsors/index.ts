import { SponsorsRepositoryInterface } from "../../Interfaces/Sponsors/SponsorsRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { SponsorsOutputDTO } from "../../DTO/Sponsors/outputDTO";
import { Sponsors } from "../../Entities/sponsors";
import logger from "../../adapters/winstomLogger";
import { singleton } from "tsyringe/dist/decorators";
import { BadRequestError } from "../../handleError/errors";
@singleton()
export class SponsorsRepository  implements SponsorsRepositoryInterface {
    prisma = prisma
    constructor(){
        this.prisma = prisma
    }

    // Cria um patrocinador 
    async create(input: Sponsors): Promise<string | null> {
        logger.info(`inicando chamada para criar patrocinador`)
        try {
            const data = {
                name:input.name,
                email:input.email ,
                company:input.company ,
                phone:input.phone ,
                url:input.url ,
                cover:input.cover ,
                
            } 
             const create = await this.prisma?.sponsors.create({
              data
            })
            logger.info(`Patrocinador ${create?.id} criado com sucesso!`)
            return  `Patrocinador ${create?.id} criado com sucesso!`
        } catch (error) {
            logger.error(`Error ao criar o patrocinador :${error}`)
            throw new BadRequestError(`Erro interno no sistema !`)
        }
        
       
    }
    // Deleta um patrocinador
    async delete(id: number): Promise<boolean> {
        logger.info(`inicando chamada para deletar patrocinador`)
        try {
          
            await this.prisma?.sponsors.delete({
                where:{
                    id
                },
               
            })
            return true
        } catch (error) {
            logger.error(`Erro ao deletar o patrocinador: ${error}`)
            throw new BadRequestError(`Erro interno no sistema !`)
        }
    } 
    //Atualiza um patrocinador
    async update(id: number, input: SponsorsInputDTO): Promise<string | null> {
        try {
            const data = {
                name:input.name,
                email:input.email ,
                company:input.company ,
                phone:input.phone ,
                url:input.url ,
                cover:input.cover ,
                
            } 
            await this.prisma?.sponsors.update({
                where:{
                    id
                },
                data
            })
            return `Patrocinador atualizado com sucesso!`
        } catch (error) {
            logger.error(`Erro ao atualizar o patrocinador: ${error}`)
            throw new BadRequestError(`Erro interno no sistema !`)
           
        }
      

    }
    //Busca todos os patrocinadores
   async  findAll(): Promise<SponsorsOutputDTO[]> {
    try {
        const sponsors = await this.prisma?.sponsors.findMany({})
        return sponsors ? sponsors as SponsorsOutputDTO[] : []

    } catch (error) {
        logger.error(`Erro ao buscar patricnadores : ${error}`)
        throw new BadRequestError(`Erro interno no sistema !`)
    }
       
    }
    //Busca um patrocinador 
   async  findID(id: number): Promise<SponsorsOutputDTO | null> {
    logger.info(`Iniciando Repository busca patrocinador por ID!`)
    try {
        const sponsor = await this.prisma?.sponsors.findUnique({
            where:{
                id
            }
         })
        
         return sponsor as SponsorsOutputDTO
    } catch (error) {
        logger.error(`Erro patrocinador repository : ${error}`)
        return null
    }
        

    }
    //Busca um patrocinador por email , para verificar se o mesmo ja contem uma conta cadastrada
    async findByEmail(email: string): Promise<SponsorsOutputDTO | null> {
        try {
            const sponsors = await this.prisma?.sponsors.findUnique({
                where:{
                    email
                }
             })
             return sponsors ? sponsors as SponsorsOutputDTO : null 
        } catch (error) {
            logger.error(`Erro ao buscar patricnadores : ${error}`)
            throw new BadRequestError(`Erro interno no sistema !`)
        }
         
    }
}