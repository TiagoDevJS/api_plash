import { inject, singleton } from "tsyringe/dist/decorators";
import { EmployeeOutputDTO } from "../../DTO/Employees/outputDTO";
import { GetEmployeeInterface } from "../../Interfaces/Employees/getEmployeeInterface";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";
import { QueryEmployee } from "../../DTO/Employees/inputDTO";

@singleton()
export class EmployeUseCaseGet implements GetEmployeeInterface{
    constructor(
        //@ts-ignore
        @inject(EmployeeRepository)
        private readonly employeeRepo:EmployeeRepository
    ){

    }
    async findAll(query:QueryEmployee): Promise<{employees:EmployeeOutputDTO[]; finalPage:number} |null> {
        try {
            const queryParams = this.prepareQuery(query)
            const data = await this.employeeRepo.findAll(queryParams)
            return data
        } catch (error) {
            logger.error(`Erro service artigos : ${error}`)
            return null
        }
    }
    async findID(id: number): Promise<EmployeeOutputDTO | null> {
        try {
            const data = await this.employeeRepo.findID(id)
            if(!data){
                logger.info('Colaborador não encontrado!')
                return null
            }
           
            return data
        } catch (error) {
            logger.info('Colaborador não encontrado!')
            logger.error(error)
            return null
        }
    }
    private prepareQuery(query: Partial<QueryEmployee>): QueryEmployee {
        const take = Number(query.take) || 8;
        const currentPage = Number(query.page) || 1;
        const skip = (currentPage - 1) * take;
    
        return {
          take,
          skip,
          name: query.name || "",
          email: query.email || "",
          profession: query.profession || "",
        };
      }
}