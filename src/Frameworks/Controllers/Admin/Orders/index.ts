import { container } from "tsyringe";
import { Order } from "../../../../Entities/oders";
import { OrdersControllersInterface } from "../../../../Interfaces/Orders/OrdersControllersInterface";
import { GetOrdersUseCase } from "../../../../UseCases/Orders/getOrdersUseCase";
import { UpdateOrderUseCase } from "../../../../UseCases/Orders/updateOrderUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { ok } from "../../Helpers/helperError";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { orderStatusSchema } from "../../../../schemas/orderValidation";
import { QueryOrders } from "../../../../DTO/Orders/inputDTO";

export class OrdersController implements OrdersControllersInterface {
  private getAllOrdersUseCase: GetOrdersUseCase;
  private updateOrdersUseCase: UpdateOrderUseCase;
  constructor() {
    this.getAllOrdersUseCase = container.resolve(GetOrdersUseCase);
    this.updateOrdersUseCase = container.resolve(UpdateOrderUseCase);
  }
  async findAll(query:QueryOrders): Promise<HttpResponse<unknown>> {
    try {
      const orders = await this.getAllOrdersUseCase.findAll(query);
      return ok(orders);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async findAID(id: number): Promise<HttpResponse<unknown>> {
    try {
      const orders = await this.getAllOrdersUseCase.findID(id);
      return ok(orders);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async update(id: number, input: Order): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(orderStatusSchema, input);
      const order = await this.updateOrdersUseCase.execute(id, result);
      return ok(order);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
}
