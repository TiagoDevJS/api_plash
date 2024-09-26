import { inject, injectable } from "tsyringe/dist/decorators";
import { User } from "../../Entities/user";
import { CreateUserUseCaseInterface } from "../../Interfaces/User/CreateUserUseCaseInterface";
import { UserRepository } from "../../Repositories/User";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface{
    constructor(
        //@ts-ignore
        @inject(UserRepository)
        private readonly userRepo:UserRepository
    ){}
    async execute(input: User): Promise<string | null> {
        try {
            const data = await User.create(input)
            const user = await this.userRepo.create(data)
            return user
        } catch (error) {
            logger.error(`Erro ao criar o usuario!`)
            throw new BadRequestError(`Erro ao chamar repositorio de usuario.`)
        }
        
    }
}