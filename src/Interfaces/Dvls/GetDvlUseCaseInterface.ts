export interface GetDvlUseCaseIntrface {
    findAll():Promise<any>
    findID(id:number):Promise<any>
}