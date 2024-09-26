
import { OrderZodValidation } from "../../schemas/orderValidation";


export interface CreateLibraryUseCaseInterface {
    execute(data:OrderZodValidation):Promise<string | null>
}