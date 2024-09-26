import { EmployeeOutputDTO } from "../../DTO/Employees/outputDTO";

export interface GetAllEmployeUseCase {
    execute():Promise <EmployeeOutputDTO[]>
    
}
export interface GetEmployeByIDUseCase {
    execute(id:number):Promise <EmployeeOutputDTO | null>
    
}
export interface UpdateEmployeUseCase {
    execute(id:number):Promise <EmployeeOutputDTO | null>
    
}
