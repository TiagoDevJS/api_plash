import { Admin } from "../../Entities/admin";

export interface AdminRepositoryInterface {
    create(input:Admin, secret:string):Promise<Admin | null>
    findByEmail(email:string):Promise<Admin | null>
}