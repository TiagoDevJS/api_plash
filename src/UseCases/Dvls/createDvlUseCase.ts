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
/**
 * @class CreateDvlUseCase
 * @implements {CreateDvlUseCaseInterface}
 * @description Classe responsável por criar a divisão de lucro (DVL) para os usuários baseada nas revistas adquiridas.
 */
@injectable()
export class CreateDvlUseCase implements CreateDvlUseCaseInterface {
  /**
   * @constructor
   * @description Inicializa o caso de uso para criação de divisão de lucro com os repositórios necessários.
   *
   * @param {DvlsRepository} dvlsRepo - Repositório responsável por manipular dados de DVL.
   * @param {MagazineRepository} magazineRepo - Repositório responsável por manipular dados das revistas.
   * @param {UserRepository} userRepo - Repositório responsável por manipular dados dos usuários.
   */
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

  /**
   * @method execute
   * @description Executa a criação de divisões de lucro (DVL) para as revistas adquiridas por um usuário.
   *
   * @param {OrderZodValidation} data - Dados validados que contêm itens (revistas) e metadados (informações do usuário).
   * @returns {Promise<string>} Retorna uma mensagem de sucesso quando a criação de DVL for bem-sucedida.
   * @throws {BadRequestError} Lança um erro caso ocorra alguma falha durante o processo de criação.
   */
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

  /**
   * @method findMagazines
   * @description Busca as revistas associadas aos itens de um pedido no repositório de revistas.
   *
   * @param {ItemsOrder[]} items - Array contendo os itens (revistas) adquiridos.
   * @returns {Promise<{ name: string, price: number, picture: string, keyPayment: string }[]>} Retorna um array com os dados das revistas.
   * @throws {NotFoundError} Lança um erro se nenhuma revista for encontrada.
   */
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

  /**
   * @method findUser
   * @description Busca o usuário no repositório de usuários com base no ID.
   *
   * @param {number} id - ID do usuário a ser buscado.
   * @returns {Promise<number>} Retorna o ID do usuário se encontrado.
   * @throws {NotFoundError} Lança um erro se o usuário não for encontrado.
   * @throws {BadRequestError} Lança um erro caso ocorra falha durante a busca.
   */
  private async findUser(id: number): Promise<number> {
    const existUser = await this.userRepo.findID(id);

    if (!existUser) {
      logger.warn(`Usuário ${id} não cadastrado na base de dados`);
      throw new NotFoundError(`Usuário não cadastrado na base de dados`);
    }

    try {
      return existUser?.id as number;
    } catch (error) {
      throw new BadRequestError(`Erro ao buscar usuário na base de dados`);
    }
  }
}
