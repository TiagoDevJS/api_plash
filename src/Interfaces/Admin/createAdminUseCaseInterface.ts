import { Admin } from "../../Entities/admin";

export interface CreateUseruseCaseInterface  {
  execute(input:Admin):Promise<string | null>
}