import { inject, singleton } from "tsyringe/dist/decorators";
import { DeleteEmployeUseCaseInterface } from "../../Interfaces/Employees/deleteEmployee";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";

 @singleton()
export class EmployeeUSeCaseDelete  implements DeleteEmployeUseCaseInterface {
   constructor(
    //@ts-ignore
     @inject(EmployeeRepository)
     private readonly employeeRepo: EmployeeRepository
   ){

   }
   async execute(id: number): Promise<boolean> {
    logger.info(`Ìniciando servico deletar colaborador `)
      const existEmployee = await this.employeeRepo.findID(id)
      if(!existEmployee){
        logger.warn(`Colaborador ${id} não encontrado `)
        return false
      }
      try {
        await this.employeeRepo.delete(id)
        logger.info(`Colaborador   deletado com sucesso! `)
        return true
      } catch (error) {
        logger.info(`Erro servico deletar colaborador ${error} `)
        return false
      }
      
   }
}