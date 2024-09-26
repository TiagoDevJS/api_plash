import { DvlOutupDTO } from "../../DTO/Dvls/outputDTO"
import { Dvl } from "../../Entities/dvls"

export interface DvlRepositoryInterface {
    create(input:Dvl):Promise<string>
    update(ids:number[],paidOut:number):Promise<{ids:number[], receive:number}>
    findAll():Promise<Partial<DvlOutupDTO[]>>
    findID(id:number):Promise<Dvl | null>
    findAllByIDS(id:number[]):Promise<DvlOutupDTO[]>
}