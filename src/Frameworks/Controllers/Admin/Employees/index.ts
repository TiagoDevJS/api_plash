import { container } from "tsyringe";
import { Employee } from "../../../../Entities/employee";
import { EmployeeUSeCaseCreate } from "../../../../UseCases/Employees/createEmployeeUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import {
  errorInput,
  notFound,
  ok,
  serverError,
} from "../../Helpers/helperError";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { employeeSchema } from "../../../../schemas/employeeValidation";
import logger from "../../../../adapters/winstomLogger";
import { EmployeeControllerInterface } from "../../../../Interfaces/Employees/EmployeeControllerInterface";
import { EmployeUseCaseGet } from "../../../../UseCases/Employees/getEmployeeUseCase";
import { EmployeeUseCaseUpdate } from "../../../../UseCases/Employees/updateEmployeeUseCase";
import { EmployeeUSeCaseDelete } from "../../../../UseCases/Employees/deleteEmployeeUseCase";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";

export class EmployeeController implements EmployeeControllerInterface {
  private createEmployeeUsecase: EmployeeUSeCaseCreate;
  private updateEmployeeUsecase: EmployeeUseCaseUpdate;
  private deleteEmployeeUsecase: EmployeeUSeCaseDelete;
  private getEmployeeUsecase: EmployeUseCaseGet;
  constructor() {
    this.createEmployeeUsecase = container.resolve(EmployeeUSeCaseCreate);
    this.updateEmployeeUsecase = container.resolve(EmployeeUseCaseUpdate);
    this.deleteEmployeeUsecase = container.resolve(EmployeeUSeCaseDelete);
    this.getEmployeeUsecase = container.resolve(EmployeUseCaseGet);
  }
  async create(input: Employee): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(employeeSchema, input);
      const data = await this.createEmployeeUsecase.execute(result);
      logger.info(`Colaborador criado com sucesso `);
      return ok(data);
    } catch (error: any) {
      logger.error(`Erro ao criar colaborador : ${error}`);
      return handleErrorResponse(error);
    }
  }
  async update(id: number, input: Employee): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(employeeSchema, input);
      const data = await this.updateEmployeeUsecase.execute(id, result);
      logger.info(`Colaborador atualizado com sucesso `);
      return ok(data);
    } catch (error: any) {
      logger.error(`Erro controller  ${error}`);
      return handleErrorResponse(error);
    }
  }
  async delete(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.deleteEmployeeUsecase.execute(id);
      logger.info(`Colaborador deletado com sucesso `);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async findAll(query: any): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getEmployeeUsecase.findAll(query);
      logger.info(`Colaboradores encontrados ${data?.employees.length}`);
      return ok(data);
    } catch (error: any) {
      logger.error(`Erro controller Employee ${error}`);
      return handleErrorResponse(error);
    }
  }
  async findID(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getEmployeeUsecase.findID(id);
      return ok(data);
    } catch (error: any) {
      logger.error(`Erro ao criar employee : ${error}`);
      return handleErrorResponse(error);
    }
  }
  
}
