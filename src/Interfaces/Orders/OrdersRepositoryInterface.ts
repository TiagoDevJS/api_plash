import { OrderInputDTO, QueryOrders } from "../../DTO/Orders/inputDTO";
import { OrderoutpuDTO } from "../../DTO/Orders/outputDTO";
import { Order } from "../../Entities/oders";


export interface OrderRepositoryInterface {
    findAll(query:QueryOrders):Promise<{orders:OrderoutpuDTO[]; finalPage:number}>
    findID(id:number):Promise<OrderoutpuDTO | null>
    update(id:number,input:OrderInputDTO):Promise<string>
    create(input:Order):Promise<string | null>
}