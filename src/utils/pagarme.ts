import logger from "../adapters/winstomLogger";
import { BadRequestError } from "../handleError/errors";

export type Items = {
  code:string | null,
  quantity:number | null,
  amount:number | null,
  description:string | null
}
export class Pagarme {
      static async createOrderCheckout(items:Items[],totalAmount:number | null,id:number| null,name:string | null, email:string | null,):Promise<string | null>{
        try {
          const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Basic c2tfdGVzdF9lMDg4NGQ5ODlmNDQ0NzY0YTgzMDdjYWI1NmU0MT`,
            },
            body: JSON.stringify({
              customer: {
                name: name,
                email: email,
      
              },
              items: items,
      
              payments: [
                {
                  payment_method: "checkout",
      
                  checkout: {
                    expires_in: 108000,
                    default_payment_method: "pix",
                    accepted_payment_methods: ["pix", "credit_card"],
                    success_url: "http://localhost:3001/sucess",
                    skip_checkout_success_page: false,
                    customer_editable: true,
                    billing_address_editable: true,
                    Pix: {
                      expires_in: 108000,
                    },
                    credit_card: {
                      installments: [
                        {
                          number: 1,
                          total: totalAmount as number + 10,
                        },
                        {
                          number: 2,
                          total: totalAmount,
                        },
                        {
                          number: 3,
                          total: totalAmount,
                        },
                        {
                          number: 4,
                          total: totalAmount,
                        },
                        {
                          number: 5,
                          total: totalAmount,
                        },
                      ],
                      statement_descriptor: "Plash",
                    },
                  },
                },
              ],
              
              closed: true,
              metadata: { id: id },
            }),
          };
          const request = await fetch("https://api.pagar.me/core/v5/orders", options);
          const response = await request.json();
          if (!request.ok) {
           
            logger.error(`Error ${response.message}`)
            throw new BadRequestError(`Erro ao chamar o sistema de pagamento!`);
          }
          return response?.checkouts[0]?.payment_url
        } catch (error) {
          logger.error(`Error :${error}`)
          if(error instanceof BadRequestError){
            throw new BadRequestError(`Erro ao chamar o sistema de pagamento!`);
          }
          throw new BadRequestError(`Erro ao chamar o sistema de pagamento!`)
        }
       
     }

}
