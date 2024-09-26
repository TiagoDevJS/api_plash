import { inject, injectable } from "tsyringe/dist/decorators";
import { Order } from "../../Entities/oders";
import { UpdateOrderUseCaseInterface } from "../../Interfaces/Orders/UpdateOrderUseCaseInterface";
import { OrderRepository } from "../../Repositories/Orders";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@injectable()
export class UpdateOrderUseCase implements UpdateOrderUseCaseInterface{
    constructor(
        //@ts-ignore
        @inject(OrderRepository)
        private readonly orderRepo:OrderRepository
    ){}
 async execute(id: number, input: Order): Promise<string> {
     const existOrder = await this.orderRepo.findID(id)
     if(!existOrder){
        logger.warn(`Erro ao buscar ordem de serviço ID:${id}`)
        throw new NotFoundError(`Oderm de serviço não encontrada!`)
     }
     try {
        const date = Order.createOrder(input)
        const update = await this.orderRepo.update(existOrder.id, input)
        return update
        
     } catch (error:any) {
        logger.error(`Erro ao atualizar a ordem de serviço : ${error}`)
        throw new BadRequestError(`Erro ao atualizar a ordem de serviço`)
     }
}
}