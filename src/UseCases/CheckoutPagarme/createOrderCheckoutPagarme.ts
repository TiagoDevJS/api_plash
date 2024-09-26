import { inject, injectable } from "tsyringe/dist/decorators";
import { CreateOrderUseCaseInterface } from "../../Interfaces/CheckoutPagarm/CreateOrderUseCaseInterface";
import { Checkout } from "../../Entities/checkout";
import { OrdersInputDTO } from "../../DTO/CheckoutPagarme/inputDTO";
import logger from "../../adapters/winstomLogger";
import { MagazineRepository } from "../../Repositories/Magazines";
import { Pagarme } from "../../utils/pagarme";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { BadRequestError } from "../../handleError/errors";
export interface cartItems {
  items: [
    {
      id: number;
    }
  ];
}
export type OrderMapItems = {
  cartItems: cartItems[];
};
export type ItemsOrder = {
  code: number;
  quantity: number;
  amount: number;
  description: string;
};
// Classe que cria a checkoout de pagamento
@injectable()
export class CreateOrderCheckoutPagarme implements CreateOrderUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}
  async execute(data: OrdersInputDTO): Promise<string | null> {
    try {
      logger.info(`Chamando api pagarme para retornar a url de pagamento....`);

      const magazines = await this.getItemsByDB(data);
      const items = this.createItemsOrder(magazines);
      const totalAmount = this.totalAmount(items);

      const urlPayment = await Pagarme.createOrderCheckout(
        items as any,
        totalAmount as any,
        Number(data.id),
        data.name,
        data.email
      );

      return urlPayment;
    } catch (error) {
      logger.error(`Erro ao chamar sistema de pagamento!`);
      throw new BadRequestError(`Erro ao chamar serviço de pagamento!`);
    }
  }
  // Funçao que calcula o total do cart
  private totalAmount(cart: any): number {
    const totalAmount = cart?.reduce(
      (accumulator: number, currentValue: ItemsOrder) => {
        return accumulator + currentValue.amount;
      },
      0
    );
    return totalAmount;
  }
  // Funçao que criar o schema de checkout  baseado como a pagarme solicita
  private createItemsOrder(magazines: MagazineOutputDTO[]): ItemsOrder[] {
    return magazines?.map((magazine) => {
      return {
        code: magazine?.id,
        quantity: 1,
        amount: Number(magazine?.price * 100),
        description: magazine?.name,
      };
    });
  }
  // Funçao que busca os dados do banco para evitar erro de preço ou produtos
  private async getItemsByDB(
    data: OrdersInputDTO
  ): Promise<MagazineOutputDTO[]> {
    const orders = Checkout.createOrder(data);
    const ids = orders.cartItems.map((item: any) => {
      return item.id;
    });
    const magazines = await this.magazineRepo.findByIDS(ids);
    return magazines;
  }
}
