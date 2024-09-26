export interface PayComissionEmployeeUseCaseInterface {
    execute(id:number,pay:number):Promise<string | null>
}