import { OrdersInputDTO } from "../../DTO/CheckoutPagarme/inputDTO";


export interface CreateOrderUseCaseInterface {
    execute(data:OrdersInputDTO):Promise<string | null>
}