import { inject, singleton } from "tsyringe/dist/decorators";
import { Magazine } from "../../Entities/magazine";
import { MagazineUpdateInterface } from "../../Interfaces/Magazines/UpdateMagazineInterface";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";


// Camada de serviço responsavel por enviar   dados e manipular para atualizar uma revistas.
@singleton()
export class MagazineUseCaseUpdate implements MagazineUpdateInterface{
  constructor(
    //@ts-ignore
@inject(MagazineRepository)
private readonly magazineRepo:MagazineRepository
  ){

  }
   // Funçao responsavel por enviar os dados para atualizar  revistas no banco de dados
  async execute(id: number, input: Magazine): Promise<string | null> {
       const existMagazine = await this.magazineRepo.findID(id)
       if(!existMagazine){
        logger.warn(`Revista não encontrada`)
        throw new NotFoundError('Revista não encontrada')
       }

    try {
      const data = Magazine.create(input)
      const update = await this.magazineRepo.update(existMagazine.id, data)
      return update
    } catch (error) {
      logger.error(`Erro use case ${error}`)
      throw new BadRequestError('Erro ao chamar respositorio de revistas')
    }
   
  }
}