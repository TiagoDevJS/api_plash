import { inject, injectable } from "tsyringe/dist/decorators";
import { Dvl } from "../../Entities/dvls";
import { CreateDvlUseCaseInterface } from "../../Interfaces/Dvls/CreateDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { ItemsOrder } from "../CheckoutPagarme/createOrderCheckoutPagarme";
import { MagazineRepository } from "../../Repositories/Magazines";
import { OrderZodValidation } from "../../schemas/orderValidation";
import { UserRepository } from "../../Repositories/User";

export type OrderItems = {
  id: number;
  title: string;
  cover: string;
  price: number;
  model: string;
  quantity: number;
};
@injectable()
export class CreateDvlUseCase implements CreateDvlUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(DvlsRepository)
    //@ts-ignore
    @inject(MagazineRepository)
    //@ts-ignore
    @inject(UserRepository)
    private readonly dvlsRepo: DvlsRepository,
    private readonly magazineRepo: MagazineRepository,
    private readonly userRepo: UserRepository
  ) {}
  async execute(data: OrderZodValidation): Promise<string> {
    const { items, metadata } = data;

    try {
      const id = await this.findUser(Number(metadata.id));
      const magazines = await this.findMagazines(items as []);
      const createDvlsPromises = magazines.map((item) => {
        const dvls = Dvl.create(item as Dvl, id);

        return this.dvlsRepo.create(dvls);
      });
      await Promise.all(createDvlsPromises);
      return `Divisão de lucro criada com sucesso!`;
    } catch (error: any) {
      logger.error(`Erro ao criar divisão de lucro ${error.message}`);
      throw new BadRequestError(
        `Erro ao criar divisão de lucro! Error: ${error?.message}`
      );
    }
  }
  private async findMagazines(items: ItemsOrder[]) {
    const ids = items.map((item) => Number(item.code));
    const magazines = await this.magazineRepo.findByIDS(ids);
    return magazines.map((magazine) => {
      return {
        name: magazine.name,
        price: magazine.price,
        picture: magazine.cover,
        keyPayment: `${magazine.name}#${magazine.id}`,
      };
    });
  }
  private async findUser(id: number): Promise<number> {
    const existUser = await this.userRepo.findID(id);
    if (!existUser) {
      logger.warn(`Usuário ${id} não cadastrado na base de dados`);
      throw new NotFoundError(`Usuário  não cadastrado na base de dados `);
    }
    try {
      return existUser?.id as number;
    } catch (error) {
      throw new BadRequestError(`Erro ao buscar usuario na base de dados`);
    }
  }
}
