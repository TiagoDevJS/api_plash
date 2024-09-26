export interface UpdateDvlUseCaseInterface {
    execute(id:number[] , paidOut:number):Promise<string>
}