export interface DeleteEmployeeMagazineUseCaseInterface {
    execute(magazineId:number, employeeId:number):Promise<Boolean>
}