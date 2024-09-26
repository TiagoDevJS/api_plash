import { OrderItems } from "../../UseCases/Orders/createOrdersUseCase";
enum Status {
    andamento = "andamento",
    enviado = "enviado",
    entregue = "entregue",
}
export type OrderInputDTO = {

 status?:Status
 codeEnv?:string
 city:string;
 userId:number;
 amout:number;
 name:string;
 email:String;
 street:string;
 street_number:string;
 complement:string
 zip_code:string
 neighborhood:string
 state:string
 country:string
 phone:string
 items:OrderItems[]
}

export type QueryOrders = {
    take?:number 
    skip?:number 
    page?:number
    name?:string 
    email?:string 
    city?:string 
    id?:number 
    status?:Status



}