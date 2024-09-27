import { inject, injectable } from "tsyringe/dist/decorators";
import { CreateOrdersUseCaseInterface } from "../../Interfaces/Orders/CreateOrdersUseCaseInterface";
import { OrderZodValidation } from "../../schemas/orderValidation";
import { Order } from "../../Entities/oders";
import { OrderRepository } from "../../Repositories/Orders";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

export type Items = {
  id: string;
  code: string;
  amount: number;
  status: string;
  type: string;
  description: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};
export type OrderItems = {
  id: number;
  title: string;
  cover: string;
  price: number;
  model: string;
  quantity: number;
};
/**
 * @class CreateOrdersUseCase
 * @description Caso de uso responsável por criar ordens de serviço para revistas.
 */
@injectable()
export class CreateOrdersUseCase implements CreateOrdersUseCaseInterface {
  /**
   * @constructor
   * @description Injeta os repositórios de revistas e de ordens necessários para criar uma nova ordem de serviço.
   * 
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   * @param {OrderRepository} orderRepo - Repositório responsável pela manipulação das ordens de serviço.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    //@ts-ignore
    @inject(OrderRepository)
    private readonly magazineRepo: MagazineRepository,
    private readonly orderRepo: OrderRepository
  ) {}

  /**
   * @method execute
   * @description Cria uma nova ordem de serviço com base nos dados fornecidos.
   * 
   * @param {OrderZodValidation} data - Dados validados da ordem de serviço.
   * @returns {Promise<string>} Retorna uma mensagem de sucesso após a criação da ordem.
   * 
   * @throws {BadRequestError} Caso ocorra um erro ao criar a ordem de serviço.
   */
  async execute(data: OrderZodValidation): Promise<string> {
    try {
      const createOrderItems = await this.createOrder(data);
      const order = await this.orderRepo.create(createOrderItems);
      logger.info(
        `Ordem de serviço adicionada com sucesso ${JSON.stringify(order)}`
      );
      return "Criada com sucesso";
    } catch (error) {
      throw new BadRequestError(`Erro ao criar a ordem de serviço`);
    }
  }

  /**
   * @method createOrder
   * @description Prepara e cria os dados da ordem de serviço a partir dos dados fornecidos.
   * 
   * @param {OrderZodValidation} data - Dados da ordem de serviço.
   * @returns {Promise<Order>} Retorna os dados da ordem de serviço criada.
   * 
   * @throws {BadRequestError} Caso ocorra um erro ao criar a ordem de serviço.
   */
  private async createOrder(data: OrderZodValidation): Promise<Order> {
    try {
      const { customer } = data.charges[0];
      const { metadata } = data;
      const { items } = data;
      const itemOrder = await this.getItems(items);
      const order: Order = {
        items: itemOrder,
        street_number: customer?.address?.number as string,
        name: customer?.name,
        email: customer?.email,
        amout: data?.amount,
        city: customer?.address?.city as string,
        complement: customer?.address?.complement as string,
        country: customer?.address?.country as string,
        phone: `${customer?.phones?.mobile_phone?.area_code} ${customer?.phones?.mobile_phone?.number}`,
        state: customer?.address?.state as string,
        street: customer?.address?.street as string,
        neighborhood: customer?.address?.neighborhood as string,
        zip_code: customer?.address?.zip_code as string,
        userId: Number(metadata.id),
      };
      const orderData = Order.createOrder(order);
      return orderData;
    } catch (error) {
      logger.error(`Erro ao criar a ordem de serviço`);
      throw new BadRequestError(`Erro ao criar a ordem de serviço`);
    }
  }

  /**
   * @method getItems
   * @description Busca e retorna os itens da ordem de serviço com base nos códigos fornecidos.
   * 
   * @param {Items[]} items - Lista de itens a serem incluídos na ordem.
   * @returns {Promise<OrderItems[]>} Retorna uma lista de itens formatada para a ordem.
   * 
   * @throws {NotFoundError} Caso não sejam encontradas revistas correspondentes aos códigos fornecidos.
   * @throws {BadRequestError} Caso ocorra um erro ao buscar as revistas.
   */
  private async getItems(items: Items[]): Promise<OrderItems[]> {
    const ids = items.map((item) => Number(item.code));
    const magazines = await this.magazineRepo.findByIDS(ids);
    if (!magazines || magazines.length <= 0) {
      logger.warn(`Erro ao buscar revistas para criar a ordem de serviço`);
      throw new NotFoundError(
        `Erro ao buscar revistas para criar a ordem de serviço`
      );
    }
    try {
      const items = magazines.map((magazine) => {
        return {
          id: magazine.id,
          title: magazine.name,
          cover: magazine.cover,
          price: magazine.price,
          model: magazine.model,
          quantity: 1,
        };
      });
      return items as OrderItems[];
    } catch (error: any) {
      logger.error(
        `Erro ao buscar revistas para criar ordem de serviço ${error.message}`
      );
      throw new BadRequestError(`Erro ao buscar revistas`);
    }
  }
}
