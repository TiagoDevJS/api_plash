import { Request,Response } from "express"
export interface IpublicInterfaceMagazineController {
    getAllMagazine(req:Request,res:Response):Promise<[]>
}