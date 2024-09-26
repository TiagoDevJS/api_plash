import { Magazine } from "../../Entities/magazine";

export  interface MagazineUpdateInterface {
    execute(id:number, input:Magazine):Promise<string | null>
}