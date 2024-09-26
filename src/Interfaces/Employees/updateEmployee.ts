import { Employee } from "../../Entities/employee";

export interface EmployeUpdateUseCaseInterface {
  execute(id:number, input:Employee):Promise<string | null>
}