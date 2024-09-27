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
  // Funçao que executa a chamada para o respository
  async execute(data: OrderZodValidation): Promise<string> {
    const { items, metadata } = data;

    try {
      // Busca o id do usuario Classe private FindUSer
      const id = await this.findUser(Number(metadata.id));
      //Bucas as revistas Classe Private FindMagazines
      const magazines = await this.findMagazines(items as []);
      // Mapea os dados  em magazines criando um instancia da Class dvl e enviando os dados para respository
      const createDvlsPromises = magazines.map((item) => {
        const dvls = Dvl.create(item as Dvl, id);
       // Retorna os dados do respository 
        return this.dvlsRepo.create(dvls);
      });
      // Inicia a promise  para criar os dvl
      await Promise.all(createDvlsPromises);
      //Retorna a string criada com sucesso para sinalizar que tudo ocorreu bem 
      return `Divisão de lucro criada com sucesso!`;
    } catch (error: any) {
      // Lança um erro com winstom logger e passando o erro 
      logger.error(`Erro ao criar divisão de lucro ${error.message}`);
      throw new BadRequestError(
        `Erro ao criar divisão de lucro! Error: ${error?.message}`
      );
    }
  }
  // Funçao que busca as resvistas  no respository
  private async findMagazines(items: ItemsOrder[]) {
    // Mapeia os ids do getway e pagamento para um array 
    const ids = items.map((item) => Number(item.code));
    // Busca as revistas  com os ids passado pelo getway 
    const magazines = await this.magazineRepo.findByIDS(ids);
    // Retorna um array de objeto de revistas baseado nos parametros colocados 
    return magazines.map((magazine) => {
      return {
        name: magazine.name,
        price: magazine.price,
        picture: magazine.cover,
        keyPayment: `${magazine.name}#${magazine.id}`,
      };
    });
  }
  //Funçao que busca os usuarios no repository 
  private async findUser(id: number): Promise<number> {
    const existUser = await this.userRepo.findID(id);
    // verifica se o usuario exista caso contrario lança um error como nao encontrado!
    if (!existUser) {
      logger.warn(`Usuário ${id} não cadastrado na base de dados`);
      throw new NotFoundError(`Usuário  não cadastrado na base de dados `);
    }
    try {
      // Retorna o id do usuario 
      return existUser?.id as number;
    } catch (error) {
      // Lança um erro badrequest para qualquer outro tipo de erro !
      throw new BadRequestError(`Erro ao buscar usuario na base de dados`);
    }
  }
}
