

export interface IDeleteUseCase {
    delete(id:number):Promise<string | null>
}