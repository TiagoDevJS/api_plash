import { QueryEmployee } from "../../DTO/Employees/inputDTO";
import { EmployeeOutputDTO } from "../../DTO/Employees/outputDTO";

export interface GetEmployeeInterface {
    findAll(query:QueryEmployee):Promise <{employees:EmployeeOutputDTO[]; finalPage:number} | null>
    findID(id:number):Promise <EmployeeOutputDTO | null>
}