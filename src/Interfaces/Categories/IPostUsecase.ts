export interface ICreateCategories {
    create(name:string):Promise <string | null>
}