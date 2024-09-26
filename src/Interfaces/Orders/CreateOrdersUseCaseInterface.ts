import { LibraryInputDTO } from "../../DTO/Library/inputDTO";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { OrderZodValidation } from "../../schemas/orderValidation";

export interface CreateOrdersUseCaseInterface {
    execute(data:OrderZodValidation):Promise<string>
  
}