export interface IGetCategoriesInterface {
    findAll():Promise<any>
    findID(id:number):Promise<any>
}