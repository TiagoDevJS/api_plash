export interface DeleteCategoriesInterface {
    delete(id:number):Promise<string | null>
}