import { QueryOrders } from "../../DTO/Orders/inputDTO";
import { Order } from "../../Entities/oders";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface OrdersControllersInterface {
    findAll(query:QueryOrders):Promise<HttpResponse<unknown>>
    findAID(id:number):Promise<HttpResponse<unknown>>
    update(id:number, input:Order):Promise<HttpResponse<unknown>>
}