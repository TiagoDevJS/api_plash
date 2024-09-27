import { inject, injectable } from "tsyringe/dist/decorators";
import { GetDvlUseCaseIntrface } from "../../Interfaces/Dvls/GetDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
// Class GET usada para buscar dados do dvls no sistema
@injectable()
export class GetDvlUseCase implements GetDvlUseCaseIntrface {
    constructor(
        //@ts-ignore
        @inject(DvlsRepository)
        private readonly dvlsRepo:DvlsRepository
    ){}
    //Funçao que busca os dados no respository e retorna uma lista de dvl 
    async findAll(): Promise<any> {
        try {
            // Faz a chamada para o respository e retorna uma array de dvls
            const data = await this.dvlsRepo.findAll()
            // Retorna os dados da chamada
            return data
            
        } catch (error:any) {
            logger.error(`Erro ao buscar dvls no banco de dados ${error.message}`)
            throw new BadRequestError(`Erro ao buscar vls na base de dados `)
        }
    }
     //Funçao que busca os dados no respository e retorna um objeto de dvl 
    async  findID(id: number): Promise<any> {
        // Busca o dvl no respository
        const existDvl = await this.dvlsRepo.findID(id)
        // Verifica se existe caso contrario lança um erro nao encontrado
        if(!existDvl){
            // Logger para verificar qual id nao foi encontrado 
            logger.warn(`Dvl ${id} não encontrado!`)
            throw new NotFoundError(`Dvl não encontrado`)
        }
        try {
        // Retorna os dados encontrado 
            return existDvl
        } catch (error:any) {
            // Exibe o log de erro 
            logger.error(`Erro ao buscar dvl solicitado :${error.message}`)
            //Retorna badquest para outro tipo de erro 
            throw new BadRequestError(`Erro ao buscar dvl solicitado`)
        }
    }
}