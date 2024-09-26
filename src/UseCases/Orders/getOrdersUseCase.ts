import { inject, injectable } from "tsyringe/dist/decorators";
import { OrderoutpuDTO } from "../../DTO/Orders/outputDTO";
import { GetOrdersUseCaseInterface } from "../../Interfaces/Orders/GetOrdersUseCaseInterface";
import { OrderRepository } from "../../Repositories/Orders";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { QueryOrders } from "../../DTO/Orders/inputDTO";

@injectable()
export class GetOrdersUseCase  implements GetOrdersUseCaseInterface{
     constructor(
        //@ts-ignore
        @inject(OrderRepository)
        private readonly orderRepo:OrderRepository
     ){}
    async findAll(query:QueryOrders): Promise<{orders:OrderoutpuDTO[]; finalPage:number}> {
        try {
            const queryParams = this.prepareQuery(query)
            const orders = await this.orderRepo.findAll(queryParams)
            return orders 
        } catch (error) {
            logger.error(`Erro a listar ordens de serviço `)
            throw new BadRequestError(`Erro a listar ordens de serviço`)
        }
    }
   async  findID(id:number): Promise<OrderoutpuDTO | null> {
        const existOrder = await this.orderRepo.findID(id)
        if(!existOrder){
            logger.error(`Ordem de serviço com ${id} não encontrada!`)
            throw new NotFoundError(`Ordem de serviço não encontrada!`)
        }
        try {
            return existOrder
        } catch (error) {
            logger.error(`Erro ao buscar ordem de serviço`)
            throw new BadRequestError(`Erro ao buscar a ordem de serviço`)
        }
    }
    private prepareQuery(query: Partial<QueryOrders>): Partial<QueryOrders> {
        const take = Number(query.take) || 8;
        const currentPage = Number(query.page) || 1;
        const skip = (currentPage - 1) * take;
    
        const queryParams:QueryOrders = {
          take: take as number,
          skip: skip,
        };
        // Adiciona os campos somente se eles existirem na consulta original
        if (query.id) queryParams.id = Number(query.id);
        if (query.name) queryParams.name = query.name;
        if (query.email) queryParams.email = query.email;
        if (query.city) queryParams.city = query.city;
        if (query.status) queryParams.status = query.status;
        if (query.id) queryParams.id = query.id;

    
        return queryParams;
      }
}