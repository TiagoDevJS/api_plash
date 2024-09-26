import { createMagzineInputDTO, updateMagazineInputDTO } from "../../DTO/Magazines/inputDTO"
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO"
import { Magazine } from "../../Entities/magazine"

export interface MagazineRepositoryInterface {
    create(input:createMagzineInputDTO):Promise<string | null>
    update(id:number,input:Magazine):Promise<string | null>
    delete(id:number):Promise<string | null>
    findAll(query:any):Promise<{magazines: MagazineOutputDTO []; finalPage:number }| null>
    findByStatus(satus:string,views:number | undefined):Promise< MagazineOutputDTO[]| null>
    findID(id:number):Promise<MagazineOutputDTO | null>
    findByIDS(ids:number[]):Promise<MagazineOutputDTO[]>
    removeEmployeeMagazine(magazineId:number, employeeId:number):Promise<Boolean>
}