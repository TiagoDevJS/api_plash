import { Dvl } from "../../Entities/dvls";
import { OrderZodValidation } from "../../schemas/orderValidation";

export interface CreateDvlUseCaseInterface {
    execute(data:OrderZodValidation):Promise<any>
}