import { inject, singleton } from "tsyringe/dist/decorators";
import { CreateEmployeeInterface } from "../../Interfaces/Employees/createEmployeeInterface";
import { Employee } from "../../Entities/employee";
import { EmployeeRepository } from "../../Repositories/Employees";
@singleton()
export class EmployeeUSeCaseCreate implements CreateEmployeeInterface {
    constructor(
        //@ts-ignore
        @inject(EmployeeRepository)
        private readonly employeeRepo:EmployeeRepository
    )
    {}
    async execute(input: Employee): Promise<string | null> {
        const data = await Employee.create(input)
        const response = await this.employeeRepo.create(data)
        return response
    }
}