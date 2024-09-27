import { inject, injectable } from "tsyringe/dist/decorators";
import { Order } from "../../Entities/oders";
import { UpdateOrderUseCaseInterface } from "../../Interfaces/Orders/UpdateOrderUseCaseInterface";
import { OrderRepository } from "../../Repositories/Orders";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class UpdateOrderUseCase
 * @description Caso de uso responsável por atualizar uma ordem de serviço existente.
 */
@injectable()
export class UpdateOrderUseCase implements UpdateOrderUseCaseInterface {
  /**
   * @constructor
   * @description Injeta o repositório de ordens necessário para realizar a atualização.
   * 
   * @param {OrderRepository} orderRepo - Repositório responsável pela manipulação dos dados das ordens de serviço.
   */
  constructor(
    //@ts-ignore
    @inject(OrderRepository)
    private readonly orderRepo: OrderRepository
  ) {}

  /**
   * @method execute
   * @description Atualiza uma ordem de serviço com base no ID fornecido e nos dados de entrada.
   * 
   * @param {number} id - ID da ordem de serviço a ser atualizada.
   * @param {Order} input - Dados da ordem de serviço para atualização.
   * @returns {Promise<string>} Retorna uma mensagem de sucesso após a atualização.
   * 
   * @throws {NotFoundError} Caso a ordem de serviço não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro ao atualizar a ordem de serviço.
   */
  async execute(id: number, input: Order): Promise<string> {
    // Verifica se a ordem existe
    const existOrder = await this.orderRepo.findID(id);
    if (!existOrder) {
      logger.warn(`Erro ao buscar ordem de serviço ID:${id}`);
      throw new NotFoundError(`Ordem de serviço não encontrada!`);
    }

    try {
      // Cria a ordem a partir dos dados fornecidos
      const data = Order.createOrder(input);
      
      // Atualiza a ordem no repositório
      await this.orderRepo.update(existOrder.id, data);
      
      // Log de sucesso
      logger.info(`Ordem de serviço ID:${id} atualizada com sucesso`);
      return "Ordem de serviço atualizada com sucesso";
    } catch (error: any) {
      // Log detalhado de erro
      logger.error(`Erro ao atualizar a ordem de serviço ID:${id}: ${error.message}`);
      throw new BadRequestError(`Erro ao atualizar a ordem de serviço`);
    }
  }
}
