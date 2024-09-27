import { inject, injectable } from "tsyringe/dist/decorators";
import { OrderoutpuDTO } from "../../DTO/Orders/outputDTO";
import { GetOrdersUseCaseInterface } from "../../Interfaces/Orders/GetOrdersUseCaseInterface";
import { OrderRepository } from "../../Repositories/Orders";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { QueryOrders } from "../../DTO/Orders/inputDTO";


/**
 * @class GetOrdersUseCase
 * @description Caso de uso responsável por recuperar ordens de serviço.
 */
@injectable()
export class GetOrdersUseCase implements GetOrdersUseCaseInterface {
  /**
   * @constructor
   * @description Injeta o repositório de ordens necessário para listar e buscar ordens de serviço.
   * 
   * @param {OrderRepository} orderRepo - Repositório responsável pela manipulação dos dados das ordens de serviço.
   */
  constructor(
    //@ts-ignore
    @inject(OrderRepository)
    private readonly orderRepo: OrderRepository
  ) {}

  /**
   * @method findAll
   * @description Recupera todas as ordens de serviço com base nos parâmetros de consulta fornecidos.
   * 
   * @param {QueryOrders} query - Parâmetros de consulta para filtrar as ordens de serviço.
   * @returns {Promise<{orders: OrderoutpuDTO[]; finalPage: number}>} Retorna uma lista de ordens e a página final.
   * 
   * @throws {BadRequestError} Caso ocorra um erro ao listar as ordens de serviço.
   */
  async findAll(query: QueryOrders): Promise<{ orders: OrderoutpuDTO[]; finalPage: number }> {
    try {
      const queryParams = this.prepareQuery(query);
      const orders = await this.orderRepo.findAll(queryParams);
      return orders;
    } catch (error) {
      logger.error(`Erro ao listar ordens de serviço`);
      throw new BadRequestError(`Erro ao listar ordens de serviço`);
    }
  }

  /**
   * @method findID
   * @description Recupera uma ordem de serviço específica com base no ID fornecido.
   * 
   * @param {number} id - ID da ordem de serviço a ser recuperada.
   * @returns {Promise<OrderoutpuDTO | null>} Retorna a ordem de serviço correspondente ou null se não encontrada.
   * 
   * @throws {NotFoundError} Caso a ordem de serviço não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro ao buscar a ordem de serviço.
   */
  async findID(id: number): Promise<OrderoutpuDTO | null> {
    const existOrder = await this.orderRepo.findID(id);
    if (!existOrder) {
      logger.error(`Ordem de serviço com ID ${id} não encontrada!`);
      throw new NotFoundError(`Ordem de serviço não encontrada!`);
    }
    try {
      return existOrder;
    } catch (error) {
      logger.error(`Erro ao buscar ordem de serviço`);
      throw new BadRequestError(`Erro ao buscar a ordem de serviço`);
    }
  }

  /**
   * @method prepareQuery
   * @description Prepara os parâmetros de consulta para a busca de ordens de serviço.
   * 
   * @param {Partial<QueryOrders>} query - Parâmetros de consulta que podem estar incompletos.
   * @returns {Partial<QueryOrders>} Retorna os parâmetros de consulta preparados.
   */
  private prepareQuery(query: Partial<QueryOrders>): Partial<QueryOrders> {
    const take = Number(query.take) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * take;

    const queryParams: QueryOrders = {
      take: take as number,
      skip: skip,
    };

    // Adiciona os campos somente se eles existirem na consulta original
    if (query.id) queryParams.id = Number(query.id);
    if (query.name) queryParams.name = query.name;
    if (query.email) queryParams.email = query.email;
    if (query.city) queryParams.city = query.city;
    if (query.status) queryParams.status = query.status;

    return queryParams;
  }
}
