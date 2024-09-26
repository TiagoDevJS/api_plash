import { CategoriesOutputDto } from "../../DTO/Categories/index"

export interface ICategoriesRepo{
    findAll():Promise<CategoriesOutputDto[] | null>
    findID(id:number):Promise<CategoriesOutputDto | null>
    create(name:string):Promise<string | null>
    update(id:number,name:string):Promise<any | null>
    delete(id:number):Promise<any | null>
}
