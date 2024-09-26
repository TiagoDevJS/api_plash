import { inject } from "tsyringe/dist/decorators";
import { PayComissionEmployeeUseCaseInterface } from "../../Interfaces/Employees/PayComissionEmployeeUseCaseInterface";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

export class PayComissionEmployeeUseCase implements PayComissionEmployeeUseCaseInterface {
    constructor(
        //@ts-ignore
        @inject(EmployeeRepository)
        private readonly employeeRepo:EmployeeRepository
    ){}
   async execute(id: number, pay: number):Promise<string | null> {
       const existEmployee = await this.employeeRepo.findID(id)
       if(!existEmployee){
        logger.info(`Colaborador não foi encontrado!`)
        throw new NotFoundError(`Colaborador não encontrado!`)
       }
       try {
        const payComission = await this.employeeRepo.payEmployee(existEmployee?.id as number, pay)
        return payComission
       } catch (error) {
         throw new BadRequestError(`Erro ao pagar colaborador!`)
       }
      
       
 }
}