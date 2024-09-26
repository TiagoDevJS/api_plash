import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO"
import { SponsorsOutputDTO } from "../../DTO/Sponsors/outputDTO"
import { Sponsors } from "../../Entities/sponsors"

export interface SponsorsRepositoryInterface {
    findAll():Promise<SponsorsOutputDTO[]>
    findID(id:number):Promise<SponsorsOutputDTO | null>
    findByEmail(email:string):Promise<SponsorsOutputDTO | null>
    create(input:Sponsors):Promise<string | null>
    update(id:number,input:SponsorsInputDTO):Promise<string | null>
    delete(id:number):Promise<boolean>
}