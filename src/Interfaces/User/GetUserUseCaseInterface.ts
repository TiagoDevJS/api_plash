import { User } from "../../Entities/user";


export interface GetUserUseCaseInteface {
    findAll():Promise<User[]>
    findID(id:number):Promise<User | null>
}