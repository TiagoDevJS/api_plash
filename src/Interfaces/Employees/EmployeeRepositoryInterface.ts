import { QueryEmployee } from "../../DTO/Employees/inputDTO";
import { EmployeeOutputDTO } from "../../DTO/Employees/outputDTO";
import { Employee } from "../../Entities/employee";

export interface EmployeeInterfaceRepository {
    create(input:Employee):Promise<string | null>
    update(id:number, input:Employee):Promise<string | null>
    delete(id:number):Promise<string | null>
    findAll(query:QueryEmployee):Promise<{employees:EmployeeOutputDTO[]; finalPage:number} | null>
    findID(id:number):Promise<EmployeeOutputDTO | null>
}