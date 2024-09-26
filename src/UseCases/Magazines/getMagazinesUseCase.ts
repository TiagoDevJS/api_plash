import { inject, singleton } from "tsyringe/dist/decorators";
import { QueryMagazine } from "../../DTO/Magazines/inputDTO";
import { MagazineRepository } from "../../Repositories/Magazines";

import logger from "../../adapters/winstomLogger";
import { Magazine } from "../../Entities/magazine";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { BadRequestError, NotFoundError } from "../../handleError/errors";


// Camada de serviço responsavel por enviar   dados para buscar revistas de uma revista.
@singleton()
export class MagazineUseCaseGET {
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}
   // Funçao responsavel por enviar os dados para buscar   revistas no banco de dados
  async getAllMagazines(query: QueryMagazine) {
    logger.info("Iniciando UseCase buscars  revistas");
    try {
      const queryParams = await this.prepareQuery(query);

      const magazines = await this.magazineRepo.findAll(queryParams);
      if(magazines?.magazines.length === 0){
        logger.warn(["Nenhuma revista a ser listada. "]);
        throw new NotFoundError('Nenhuma revista encontrada para ser listada')
      }
      
      return magazines;
    } catch (error) {
      logger.warn(`Erro ao chamar respositorio de revistas ${error}`);
      throw new BadRequestError('Erro use case revistas')
    }
  }
  // Funçao responsavel por enviar os dados para buscar ID  revistas no banco de dados
  async getOneMagazine(id: number) {
    logger.info("Iniciando UseCase buscar  revista");
    try {
      const magazines = await this.magazineRepo.findID(id);
      logger.info(["Chamando repository de revistas "]);
      return magazines;
    } catch (error) {
      logger.warn(`Erro ao chamar respositorio de revistas ${error}`);
      return null;
    }
  }
   // Funçao responsavel por enviar os dados para buscar ID  dados publicos  revistas no banco de dados
  async publicMagazineID(
    id: number
  ): Promise<Partial<MagazineOutputDTO | null>> {
    logger.info("Iniciando UseCase buscar  revista com dados publicos");
    const magazines = await this.magazineRepo.findID(id);
    if (!magazines) {
      logger.warn(`Revista nao encontrada`);
      throw new NotFoundError("Revista nao encontrada");
    }
    try {
      // Instancia da entity magazine responsavel por filtrar os dados do repositorio e listar apenas os publicos
      const data = Magazine.publicDataMagazine(magazines);

      return data;
    } catch (error) {
      logger.error(`Erro ao chamar respositorio de revistas ${error}`);
      throw new BadRequestError("Erro use case revistas ");
    }
  }
  async filterMagazinesByID(){
     const queryParams = {
      take: 100,
      skip:0,
      name:  "",
      volume:  "",
      author: "",
      company: "",
      category:  "",
     }
    const magazines = await this.magazineRepo.findAll(queryParams)
    const teste = [3]
    const filterData = Magazine.filterMagazaninesByID(teste,magazines?.magazines as MagazineOutputDTO[])
    const cover = filterData.map((covers)=>{
      return {
        name:covers.name,
        cover:covers.cover
      }
    })
    return cover
  }
 // Funçao que prepara a query e paginaçao , take, skip ,  queries de busca
  private prepareQuery(query: Partial<QueryMagazine>): QueryMagazine {
    const take = Number(query.take) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * take;

    return {
      take,
      skip,
      name: query.name || "",
      volume: query.volume || "",
      author: query.author || "",
      company: query.company || "",
      category: query.category || "",
    };
  }
}
