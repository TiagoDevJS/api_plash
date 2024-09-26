import { container } from "tsyringe";
import { UserInputDto } from "../../../../DTO/User/userDTO";
import { User } from "../../../../Entities/user";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { userSchema } from "../../../../schemas/userValidation";
import { CreateUserUseCase } from "../../../../UseCases/User/createUserUseCase";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { ok } from "../../Helpers/helperError";
import { HttpResponse } from "../../Helpers/protocolos";
import { GetUsersUseCase } from "../../../../UseCases/User/getUsersUseCase";

export class UserController {
    private createUserUseCase: CreateUserUseCase
    private getUserUseCase: GetUsersUseCase
    constructor(){
         this.createUserUseCase = container.resolve(CreateUserUseCase)
         this.getUserUseCase = container.resolve(GetUsersUseCase)
    }
    async create(input:UserInputDto):Promise<HttpResponse<unknown>>{
        try {
            const result = ValidatorCustom.validate(userSchema,input)
            const data  = await this.createUserUseCase.execute(result)
            return ok(data)
        } catch (error:any) {
            return handleErrorResponse(error)
        }
   
    }
    async findID (id:number):Promise<HttpResponse<unknown>>{
        try {
            const data = await this.getUserUseCase.findID(id)
            return ok(data)
        } catch (error:any) {
            return handleErrorResponse(error)
        }
    }
    async findAll ():Promise<HttpResponse<unknown>>{
        try {
            const data = await this.getUserUseCase.findAll()
            return ok(data)
        } catch (error:any) {
            return handleErrorResponse(error)
        }
    }
}