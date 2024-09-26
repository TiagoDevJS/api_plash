import { inject, injectable } from "tsyringe/dist/decorators";
import { MagazineRepository } from "../../Repositories/Magazines";
import { OrderRepository } from "../../Repositories/Orders";
import { UserRepository } from "../../Repositories/User";
import { CreateLibraryUseCase } from "../Library/createLibraryUseCase";
import { container } from "tsyringe";
import { CreateOrdersUseCase } from "../Orders/createOrdersUseCase";
import { CreateDvlUseCase } from "../Dvls/createDvlUseCase";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";
import { OrderZodValidation } from "../../schemas/orderValidation";

@injectable()
export class StatusOrderWebhookNotification {
  private createUseCaseLibrary: CreateLibraryUseCase;
  private createOrderUseCase: CreateOrdersUseCase;
  private createDvlUseCase: CreateDvlUseCase;

  constructor() {
    this.createUseCaseLibrary = container.resolve(CreateLibraryUseCase);
    this.createOrderUseCase = container.resolve(CreateOrdersUseCase);
    this.createDvlUseCase = container.resolve(CreateDvlUseCase);
  }
  async execute(data: OrderZodValidation): Promise<string> {
    try {
      await this.createDvlUseCase.execute(data);
      await this.createUseCaseLibrary.execute(data);
      await this.createOrderUseCase.execute(data);
      return `Dados criados com sucesso!`;
    } catch (error: any) {
      logger.error(`Erro ao criar dados ${error.message}`);
      throw new BadRequestError(`Erro ao criar dados no sistema!`);
    }
  }
}
