import { OrdersInputDTO } from "../DTO/CheckoutPagarme/inputDTO";

export class Checkout  {
    private cart!: string[]
     private  name!:string;
     private  email!:string;
     private  id!:string;
    constructor(props:OrdersInputDTO){
        Object.assign(this, props);
    }
    static createOrder(props:OrdersInputDTO):Checkout{
        return new Checkout(props)
    }

    get cartItems():string[]{
        return this.cart
    }
}