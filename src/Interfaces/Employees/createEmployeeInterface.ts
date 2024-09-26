import { Employee } from "../../Entities/employee";

export  interface CreateEmployeeInterface {
  execute(input:Employee):Promise<string | null>
}