import { inject, injectable } from "tsyringe/dist/decorators";

import { OrderZodValidation } from "../../schemas/orderValidation";
import { LibraryRepository } from "../../Repositories/Library";
import { UserRepository } from "../../Repositories/User";
import { MagazineRepository } from "../../Repositories/Magazines";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { User } from "../../Entities/user";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { Library } from "../../Entities/library";
import { ObjectLockLegalHoldStatus } from "@aws-sdk/client-s3";
import { CreateLibraryUseCaseInterface } from "../../Interfaces/Library/CreateLibraryUseCaseInterface";
export type Items = {
  id: string;
  code: string;
  amount: number;
  status: string;
  type: string;
  description: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};
/**
 * @class CreateLibraryUseCase
 * @implements {CreateLibraryUseCaseInterface}
 * @description Caso de uso responsável por inserir revistas na biblioteca do cliente.
 */
@injectable()
export class CreateLibraryUseCase implements CreateLibraryUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(LibraryRepository)
    //@ts-ignore
    @inject(UserRepository)
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly libraryRepo: LibraryRepository,
    private readonly magazineRepo: MagazineRepository,
    private readonly userRepo: UserRepository
  ) {}

  /**
   * @method execute
   * @description Adiciona revistas à biblioteca de um usuário com base em uma ordem de compra.
   * 
   * @param {OrderZodValidation} data - Dados validados da ordem contendo metadados e itens.
   * @returns {Promise<string | null>} Resultado da criação da biblioteca ou mensagem de erro.
   * 
   * @throws {BadRequestError} Se ocorrer um erro durante a criação da biblioteca.
   */
  async execute(data: OrderZodValidation): Promise<string | null> {
    try {
      const { metadata, items } = data;
      const idLibraryUser = await this.findLibraryUser(Number(metadata.id));
      const magazines = await this.getIDS(items);

      const library = Library.create(idLibraryUser as number, magazines);
      const result = await this.libraryRepo.create(library);

      return result;
    } catch (error) {
      logger.error(`Erro ao adicionar as revistas à biblioteca do cliente: ${error}`);
      throw new BadRequestError(`Erro ao adicionar as revistas à biblioteca do cliente`);
    }
  }

  /**
   * @method getIDS
   * @description Busca as revistas no repositório com base nos códigos dos itens fornecidos.
   * 
   * @param {Items[]} items - Lista de itens da ordem com os códigos das revistas.
   * @returns {Promise<MagazineOutputDTO[]>} Lista de revistas filtradas por modelo "Digital".
   * 
   * @throws {NotFoundError} Se nenhuma revista for encontrada.
   * @throws {BadRequestError} Se ocorrer um erro ao buscar as revistas.
   */
  private async getIDS(items: Items[]): Promise<MagazineOutputDTO[]> {
    const ids = items.map((item) => Number(item.code));
    const magazines = await this.magazineRepo.findByIDS(ids);

    if (!magazines || magazines.length <= 0) {
      logger.info(`Revistas não encontradas.`);
      throw new NotFoundError(`Revistas não encontradas.`);
    }

    try {
      const filterModel = magazines.filter((magazine) => magazine.model === "Digital");
      return filterModel;
    } catch (error) {
      logger.error(`Erro ao filtrar revistas: ${error}`);
      throw new BadRequestError(`Erro ao buscar revistas`);
    }
  }

  /**
   * @method findLibraryUser
   * @description Busca a biblioteca de um usuário com base no ID.
   * 
   * @param {number} id - ID do usuário.
   * @returns {Promise<number | null>} ID da biblioteca do usuário ou null se não existir.
   * 
   * @throws {NotFoundError} Se o usuário não for encontrado.
   * @throws {BadRequestError} Se ocorrer um erro ao buscar o usuário.
   */
  private async findLibraryUser(id: number): Promise<number | null> {
    const existeUser = await this.userRepo.findID(id);
    if (!existeUser) {
      logger.warn(`Usuário não encontrado no sistema.`);
      throw new NotFoundError(`Usuário não encontrado no sistema.`);
    }

    try {
      //@ts-ignore
      const { library } = existeUser;
      return library ? library[0].id : null;
    } catch (error) {
      logger.error(`Erro ao buscar usuário: ${error}`);
      throw new BadRequestError(`Erro ao buscar usuário`);
    }
  }
}
