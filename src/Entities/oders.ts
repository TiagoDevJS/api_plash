import { OrderInputDTO } from "../DTO/Orders/inputDTO";
import { OrderItems } from "../UseCases/Orders/createOrdersUseCase";

export class Order {
 public readonly items!:OrderItems[];

 public readonly city!:string;
 public readonly userId!:number;
 public readonly amout!:number;
 public readonly name!:string;
 public readonly email!:string;
 public readonly street!:string;
 public readonly street_number!:string;
 public readonly complement!:string
 public readonly zip_code!:string
 public readonly neighborhood!:string
 public readonly state!:string
 public readonly country!:string
 public readonly phone!:string
 constructor(props:OrderInputDTO){
    Object.assign(this, props)
 }
 static createOrder(props:OrderInputDTO):Order{
    return new Order(props)
 }

}
