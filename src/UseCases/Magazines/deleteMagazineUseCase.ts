import { inject, singleton } from "tsyringe/dist/decorators";
import { MagazineDeleteInterface } from "../../Interfaces/Magazines/DeleteMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";


// Camada de serviço responsavel por enviar e manipular  dados para deletar de uma revista.
@singleton()
export class MagazineUseCaseDelete implements MagazineDeleteInterface {
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}
// Funçao responsavel por enviar os dados para deletar  revistas no banco de dados
  async delete(id: number): Promise<string | null> {
    logger.info("Iniciando UseCase deletar revistas");
    const existMagazine = await this.magazineRepo.findID(id);
    if (!existMagazine) {
      logger.warn(`Revista não encontrada`);
      throw new NotFoundError("Revista não encontrada");
    }
    try {
      const deleteMagazine = await this.magazineRepo.delete(existMagazine.id);
      return deleteMagazine;
    } catch (error) {
      logger.error(`Erro use case ${error}`);
      throw new BadRequestError("Erro ao chamar respositorio de revistas");
    }
  }
}
