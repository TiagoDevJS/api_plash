import { container } from "tsyringe";
import { DvlControllerInterface } from "../../../../Interfaces/Dvls/DvlControllerInterface";
import { GetDvlUseCase } from "../../../../UseCases/Dvls/getDvlUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { ok } from "../../Helpers/helperError";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { UpdateDvlUseCase } from "../../../../UseCases/Dvls/updateDvlUseCase";

export class DvlsController implements DvlControllerInterface{
    private getDvlUseCase:GetDvlUseCase
    private updateDvlUseCase:UpdateDvlUseCase

    constructor(){
 this.getDvlUseCase = container.resolve(GetDvlUseCase)
 this.updateDvlUseCase = container.resolve(UpdateDvlUseCase)
 
    }
    async findAll(): Promise<HttpResponse<unknown>> {
        try {
            const data = await this.getDvlUseCase.findAll()
            return ok(data)
        } catch (error:any) {
            return handleErrorResponse(error)
        }
    }
    async findID(id: number): Promise<HttpResponse<unknown>> {
        throw ''
    }
   async  update(ids: number[], paidOut: number): Promise<HttpResponse<unknown>> {
        try {
            const update = await this.updateDvlUseCase.execute(ids,paidOut)
            return ok(update)
        } catch (error:any) {
            return handleErrorResponse(error)
        }
    }
}