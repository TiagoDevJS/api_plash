import { inject, injectable } from "tsyringe/dist/decorators";
import { GetUserUseCaseInteface } from "../../Interfaces/User/GetUserUseCaseInterface";
import { UserRepository } from "../../Repositories/User";

import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { User } from "../../Entities/user";

@injectable()
export class GetUsersUseCase implements GetUserUseCaseInteface {
  constructor(
    //@ts-ignore
    @inject(UserRepository)
    private readonly userrepo: UserRepository
  ) {}
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userrepo.findAll()
      return users
    } catch (error) {
       logger.error(`Erro ao buscar usuarios `)
       throw new BadRequestError(`Erro ao listar usuarios `)
    }
  }
  async findID(id: number): Promise<User | null> {
    const existUser = await this.userrepo.findID(id);
    if (!existUser) {
      logger.warn(`Usuario não localizado !`);
      throw new NotFoundError(`Usuario não localizado !`);
    }
    try {
      return existUser as User;
    } catch (error) {
      logger.error(`Erro ao buscar  usuario `);
      throw new BadRequestError(`Erro ao bsucar usuario `);
    }
  }
}
