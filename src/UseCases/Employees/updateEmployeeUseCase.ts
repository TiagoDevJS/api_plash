import { inject, singleton } from "tsyringe/dist/decorators";
import { Employee } from "../../Entities/employee";
import { EmployeUpdateUseCaseInterface } from "../../Interfaces/Employees/updateEmployee";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@singleton()
export class EmployeeUseCaseUpdate implements EmployeUpdateUseCaseInterface{
 constructor(
    //@ts-ignore
    @inject(EmployeeRepository)
    private readonly employeeRepo:EmployeeRepository
 ) {}
    async execute(id: number, input: Employee): Promise<string | null> {
     
        const existEmployee = await this.employeeRepo.findID(id)
        if(!existEmployee){
            logger.info(`Colaborador ${id} não foi encontrado!`)
           throw new NotFoundError(`Colaborador não encontrado!`)
        }
        try {

            const data = await Employee.create(input)
           
           const update = await this.employeeRepo.update(existEmployee?.id as number,data)
           return update
        } catch (error) {
            logger.error(`Erro camada de serviço: ${error}`)
           throw new BadRequestError(`Erro ao atualizar o colaboador! Tente novamente mais tarde!`)
        }
      
     
    }
}