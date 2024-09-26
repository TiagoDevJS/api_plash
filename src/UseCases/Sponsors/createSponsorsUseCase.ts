import { inject, injectable } from "tsyringe/dist/decorators";
import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";
import { CreateSponsorsInterface } from "../../Interfaces/Sponsors/CreateSponsorsInterface";
import { SponsorsRepository } from "../../Repositories/Sponsors";
import { Sponsors } from "../../Entities/sponsors";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, Conflict } from "../../handleError/errors";

@injectable()
export class SponsorUseCaseCreate implements CreateSponsorsInterface {
  constructor(
    //@ts-ignore
    @inject(SponsorsRepository)
    private readonly sponsorsRepo: SponsorsRepository
  ) {}
  // Funçao responsavel por enviar os dados para persistencia de patronicadores no banco de dados
  async execute(input: SponsorsInputDTO): Promise<string | null> {
    const sponsorsExist = await this.sponsorsRepo.findByEmail(input.email);
    if (sponsorsExist) {
      logger.info("Erro ao cadastrar novo patrocinador . Email já cadastrado!");
      throw new Conflict("Error: Email já cadastrado no sistema");
    }
    try {
      const data = Sponsors.create(input);
      return await this.sponsorsRepo.create(data);
    } catch (error) {
      logger.error(`Erro ao cadastrar novo patrocinador ${error}`);
      throw new BadRequestError("Erro ao chamar repositorio de patrocinadores");
    }
  }
}
