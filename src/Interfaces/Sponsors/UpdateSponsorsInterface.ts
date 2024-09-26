import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";

export interface UpdateSonsorsUseCaseInterface {
    execute(id:number,input:SponsorsInputDTO):Promise <string | null>
}