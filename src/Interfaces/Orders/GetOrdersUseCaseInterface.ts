import { QueryOrders } from "../../DTO/Orders/inputDTO";
import { OrderoutpuDTO } from "../../DTO/Orders/outputDTO";

export interface GetOrdersUseCaseInterface {
    findAll(query:QueryOrders):Promise<{orders:OrderoutpuDTO[]; finalPage:number}>
    findID(id:number):Promise<OrderoutpuDTO | null>
}