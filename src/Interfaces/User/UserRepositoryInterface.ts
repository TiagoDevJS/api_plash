import { User } from "../../Entities/user";

export interface UserRepositoryInterface {
    create(input:User):Promise<string | null>
    findAll():Promise<User[]>
    findID(id:number):Promise<Partial<User> | null>
}