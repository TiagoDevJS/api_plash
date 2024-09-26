import { inject, injectable } from "tsyringe/dist/decorators";
import { DeleteEmployeeMagazineUseCaseInterface } from "../../Interfaces/Magazines/deleteEmployeeMagazine";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class MagazineUseCaseRemoveEmployee  implements DeleteEmployeeMagazineUseCaseInterface{
    constructor(
        //@ts-ignore
        @inject(MagazineRepository)
        private readonly magazineRepo: MagazineRepository
    ){}
    async execute(magazineId: number, employeeId: number): Promise<Boolean> {
        const existMagazine = await this.magazineRepo.findID(magazineId)
        if(!existMagazine){
            logger.info(`Revista não encontrada`)
            throw new NotFoundError(`   Revista não encontrada`)
        }
        try {
            const employeeRemove = await this.magazineRepo.removeEmployeeMagazine(existMagazine.id,employeeId )
            return employeeRemove
        } catch (error) {
            logger.error('Erro ao remover colaborador da revista')
            throw new BadRequestError(`Erro ao remover colaborador da revista`)
        }
     
    }
}