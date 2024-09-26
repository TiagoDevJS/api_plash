import { inject, singleton } from "tsyringe/dist/decorators";
import { Magazine } from "../../Entities/magazine";
import { CreateMagazineInterface } from "../../Interfaces/Magazines/CreateMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines/index";
import logger from "../../adapters/winstomLogger";
import { createMagzineInputDTO } from "../../DTO/Magazines/inputDTO";
import { BadRequestError } from "../../handleError/errors";


// Camada de serviço responsavel por enviar e manipular  dados para criaçao de uma revista.
@singleton()
export class CreateMagazineUseCase implements CreateMagazineInterface {
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}
   // Funçao responsavel por enviar os dados para persistencia de revistas no banco de dados
  async create(input: createMagzineInputDTO): Promise<string | any> {
    try {
      logger.info("Iniciando UseCase");
      const data = Magazine.create(input);
      const magazine = await this.magazineRepo.create(data);

      logger.info(["Chamando repository de revistas "]);
      return magazine;
    } catch (error) {
      logger.warn(`Erro ao chamar respositorio de revistas ${error}`);
       throw new BadRequestError('Erro ao chamar repositorio de revistas ')
    }
  }
}
