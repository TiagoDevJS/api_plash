import { container } from "tsyringe";
import { CreateMagazineUseCase } from "../../../../UseCases/Magazines/createMagazineUsecase";
import { HttpResponse } from "../../Helpers/protocolos";
import {
  BadRequest,
  errorInput,
  notFound,
  ok,
  serverError,
} from "../../Helpers/helperError";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { magazineSchema } from "../../../../schemas/magazineValidation";
import { MagazineUseCaseGET } from "../../../../UseCases/Magazines/getMagazinesUseCase";
import logger from "../../../../adapters/winstomLogger";

import { Magazine } from "../../../../Entities/magazine";
import { MagazineUseCaseUpdate } from "../../../../UseCases/Magazines/updateMagazineUseCase";
import { MagazineUseCaseDelete } from "../../../../UseCases/Magazines/deleteMagazineUseCase";
import { MagazineInterfaceController } from "../../../../Interfaces/Magazines/MagazineControllerInterface";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { MagazineUseCaseRemoveEmployee } from "../../../../UseCases/Magazines/deleteEmployeeMagazineUseCase";

export class MagazineController implements MagazineInterfaceController {
  private createMagazineUseCase: CreateMagazineUseCase;
  private getMagazineUseCase: MagazineUseCaseGET;
  private updateMagazineUseCase : MagazineUseCaseUpdate
  private deleteMagazineUseCase : MagazineUseCaseDelete
  private removeEmployeeMagazineUseCase: MagazineUseCaseRemoveEmployee
  constructor() {
    this.createMagazineUseCase = container.resolve(CreateMagazineUseCase);
    this.getMagazineUseCase = container.resolve(MagazineUseCaseGET);
    this.updateMagazineUseCase = container.resolve(MagazineUseCaseUpdate);
    this.deleteMagazineUseCase = container.resolve(MagazineUseCaseDelete)
    this.removeEmployeeMagazineUseCase = container.resolve(MagazineUseCaseRemoveEmployee)
  }
  async create(input:Magazine): Promise<HttpResponse<unknown>> {
    
    try {
      const result = ValidatorCustom.validate(magazineSchema, input);
      const data = await this.createMagazineUseCase.create(result);
      logger.info(`Revista criada com sucesso!`)
      return ok(data);
    } catch (error:any) {
      logger.info(`Erro ao criar revista ${error}!`)
      return handleErrorResponse(error)
    }
  }
  async findAll(query: any): Promise<HttpResponse<unknown>> {
    

    try {
       const data = await this.getMagazineUseCase.getAllMagazines(query);
    
      logger.info(`[Revistas encontradas ${data?.magazines.length}]`);
      return ok(data);
    } catch (error:any) {
      logger.info(`Erro ao buscar revistas ${error}!`)
      return handleErrorResponse(error)
      
    }
  }
  async findID(id: number): Promise<HttpResponse<unknown>> {
   

    try {
      const data = await this.getMagazineUseCase.getOneMagazine(id);
      logger.info(`[Revistas ${data?.id} encontrada. ]`);
      return ok(data);
    } catch (error:any) {
      logger.error(`[Erro ao buscar revista ${id}: ${error}`);
      return handleErrorResponse(error)
    }
  }
  async findIDMagazines(): Promise<HttpResponse<unknown>> {
   

    try {
      const data = await this.getMagazineUseCase.filterMagazinesByID();
      logger.info(`[Revistas  encontradas ]`);
      return ok(data);
    } catch (error:any) {
      logger.error(`[Erro ao buscar revista  ${error}`);
      return handleErrorResponse(error)
    }
  }
  async findIDPublic(id: number): Promise<HttpResponse<unknown>> {
   

    try {
      const data = await this.getMagazineUseCase.publicMagazineID(id);
      logger.info(`[Revista encontrada ${data?.id}`);
      return ok(data);
    } catch (error:any) {
      logger.error(`[Erro  buscar revista ${id} dados publicos: ${error}]`);
      return handleErrorResponse(error)
    }
  }
  async update (id:number, input:Magazine):Promise<HttpResponse<unknown>>{
  
    
    
    try {
      const result = ValidatorCustom.validate(magazineSchema, input)
      const data = await this.updateMagazineUseCase.execute(id, result)
     
      logger.info(`[Revista atualizada com sucesso !]`);
      return ok(data)
      
    } catch (error:any) {
      logger.error(`[Erro ao atualizar a revista ${id}: ${error}]`);
      return handleErrorResponse(error)
    }
  }
  async delete(id:number):Promise<HttpResponse<unknown>>{
 
    try {
      const data = await this.deleteMagazineUseCase.delete(id)
      logger.info(`Revista deletada com sucesso !`)
      return ok(data)
    } catch (error:any) {
      logger.error(`[Erro ao deletar a revista ${id}: ${error}]`)
      return handleErrorResponse(error)
    }
  }
   async  removeEmployeeMagazine(magazineId: number, employeId: number): Promise<HttpResponse<unknown>> {
    
    try {
      const data = await this.removeEmployeeMagazineUseCase.execute(magazineId, employeId)
      return ok(data)
    } catch (error:any) {
      return handleErrorResponse(error)
      
    }
  }
}
