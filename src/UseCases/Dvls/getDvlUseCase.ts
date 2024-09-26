import { inject, injectable } from "tsyringe/dist/decorators";
import { GetDvlUseCaseIntrface } from "../../Interfaces/Dvls/GetDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";

@injectable()
export class GetDvlUseCase implements GetDvlUseCaseIntrface {
    constructor(
        //@ts-ignore
        @inject(DvlsRepository)
        private readonly dvlsRepo:DvlsRepository
    ){}
    async findAll(): Promise<any> {
        try {
            const data = await this.dvlsRepo.findAll()
            return data
            
        } catch (error:any) {
            logger.error(`Erro ao buscar dvls no banco de dados ${error.message}`)
            throw new BadRequestError(`Erro ao buscar vls na base de dados `)
        }
    }
    async  findID(id: number): Promise<any> {
        throw ''
    }
}