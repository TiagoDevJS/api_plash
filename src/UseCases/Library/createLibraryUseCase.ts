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

  async execute(data: OrderZodValidation): Promise<string | null> {
    try {
      const { metadata, items } = data;
      const idLibraryUser = await this.findLibraryUser(Number(metadata.id));
      const magazines = await this.getIDS(items);

      const library = Library.create(idLibraryUser as number, magazines);

      const result = await this.libraryRepo.create(library);
      return result;
    } catch (error) {
      logger.error(
        `Erro ao adiconar as revistas a biblioteca do cleinte ${error}!`
      );
      throw new BadRequestError(
        `Erro ao adiconar as revistas a biblioteca do cliente`
      );
    }
  }
  private async getIDS(items: Items[]): Promise<MagazineOutputDTO[]> {
    const ids = items.map((item) => Number(item.code));

    const magazines = await this.magazineRepo.findByIDS(ids);

    if (!magazines || magazines.length <= 0) {
      logger.info(`Revistas nao encontradas.`);
      throw new NotFoundError(`Revistas nao encontradas.`);
    }
    try {
      const filterModel = magazines.filter(
        (magazine) => magazine.model === "Digital"
      );
      return filterModel;
    } catch (error) {
      throw new BadRequestError(`Erro ao buscar revistas`);
    }
  }
  private async findLibraryUser(id: number): Promise<number | null> {
    const existeUser = await this.userRepo.findID(id);
    if (!existeUser) {
      logger.warn(`Usuario nao encontrado no sistema `);
      throw new NotFoundError(`Usuario nao encontrado no sistema `);
    }
    try {
      //@ts-ignore
      const { library } = existeUser;
      return library ? library[0].id : null;
    } catch (error) {
      logger.error(`Erro ao buscar usuario : ${error}`);
      throw new BadRequestError(`Erro ao buscar usuario : ${error}`);
    }
  }
}
