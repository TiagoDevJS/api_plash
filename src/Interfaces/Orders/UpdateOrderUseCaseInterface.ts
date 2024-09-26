import { Order } from "../../Entities/oders";

export interface UpdateOrderUseCaseInterface {
    execute(id:number, input:Order):Promise<string>
}