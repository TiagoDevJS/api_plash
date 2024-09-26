import { User } from "../../Entities/user";

export interface CreateUserUseCaseInterface {
    execute(input:User):Promise<string | null>
}