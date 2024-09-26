import { createArticleInputDTO } from "../../DTO/Articles/inputDTO";

export interface IPostUseCaseInterface {
    create(input:createArticleInputDTO):Promise<string | null>
    
}