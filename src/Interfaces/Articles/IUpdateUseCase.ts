import { updateArticleInputDTO } from "../../DTO/Articles/inputDTO";

export interface IUpdateUseCase {
    update(id:number,input:updateArticleInputDTO):Promise<string | null>
}