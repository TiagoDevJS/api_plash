export interface IUpdateCategories {
    update(id:number,name:string):Promise<any | null>
}