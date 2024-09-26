import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO"


export interface ImagazinesInterface {
    getAllMagazines():Promise<MagazineOutputDTO[] >
    getMagazineId(id:number):Promise<MagazineOutputDTO | null>
    getMostViews():Promise<MagazineOutputDTO[]>
}