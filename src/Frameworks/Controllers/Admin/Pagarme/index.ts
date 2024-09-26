import { container } from "tsyringe";
import { OrdersInputDTO,} from "../../../../DTO/CheckoutPagarme/inputDTO";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { OrderSchema, OrderZodValidation } from "../../../../schemas/orderValidation";
import { CreateOrderCheckoutPagarme } from "../../../../UseCases/CheckoutPagarme/createOrderCheckoutPagarme";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { ok } from "../../Helpers/helperError";
import { HttpResponse } from "../../Helpers/protocolos";
import { createOrderSchema } from "../../../../schemas/orderCreate.validation";
import { StatusOrderWebhookNotification } from "../../../../UseCases/CheckoutPagarme/statusOrderCheckoutPagarme";

export class PagarmeController {
  private createCeckout: CreateOrderCheckoutPagarme;
  private statusOrderPayment: StatusOrderWebhookNotification;
  constructor() {
    this.createCeckout = container.resolve(CreateOrderCheckoutPagarme);
    this.statusOrderPayment = container.resolve(StatusOrderWebhookNotification);
  }
  async createOrderPayment(
    data: OrdersInputDTO
  ): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(createOrderSchema, data);
      const create = await this.createCeckout.execute(result);
      return ok(create);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async statusOrderWebhookNotification(
    data: OrderZodValidation
  ): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(OrderSchema, data);
      const create = await this.statusOrderPayment.execute(result);
      return ok(create);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
}
