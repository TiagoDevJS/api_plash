import { SponsorsOutputDTO } from "../../DTO/Sponsors/outputDTO"


export interface GetSponsorsInterface {
    findAll():Promise<SponsorsOutputDTO[]>
    findID(id:number):Promise<SponsorsOutputDTO | null>
}