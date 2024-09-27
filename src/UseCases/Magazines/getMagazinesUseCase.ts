import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { QueryMagazine } from "../../DTO/Magazines/inputDTO";
import { MagazineRepository } from "../../Repositories/Magazines";

import logger from "../../adapters/winstomLogger";
import { Magazine } from "../../Entities/magazine";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class MagazineUseCaseGET
 * @description Caso de uso responsável por buscar revistas no sistema.
 */
@injectable()
export class MagazineUseCaseGET {
  /**
   * @constructor
   * @description Injeta o repositório de revistas necessário para buscar revistas do sistema.
   *
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}

  /**
   * @method getAllMagazines
   * @description Recupera todas as revistas com base nos parâmetros de consulta fornecidos.
   *
   * @param {QueryMagazine} query - Parâmetros de consulta para filtrar as revistas.
   * @returns {Promise<any>} Retorna uma lista de revistas.
   *
   * @throws {NotFoundError} Caso nenhuma revista seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro ao chamar o repositório de revistas.
   */
  async getAllMagazines(query: QueryMagazine) {
    logger.info("Iniciando UseCase buscar revistas");
    try {
      const queryParams = await this.prepareQuery(query);

      const magazines = await this.magazineRepo.findAll(queryParams);
      if (magazines?.magazines.length === 0) {
        logger.warn(["Nenhuma revista a ser listada. "]);
        throw new NotFoundError("Nenhuma revista encontrada para ser listada");
      }

      return magazines;
    } catch (error) {
      logger.warn(`Erro ao chamar repositório de revistas ${error}`);
      throw new BadRequestError("Erro use case revistas");
    }
  }

  /**
   * @method getOneMagazine
   * @description Recupera uma revista específica com base no ID fornecido.
   *
   * @param {number} id - ID da revista a ser recuperada.
   * @returns {Promise<any | null>} Retorna a revista correspondente ao ID ou null se não encontrada.
   *
   * @throws {BadRequestError} Caso ocorra um erro ao chamar o repositório de revistas.
   */
  async getOneMagazine(id: number) {
    logger.info("Iniciando UseCase buscar revista");
    try {
      const magazines = await this.magazineRepo.findID(id);
      logger.info(["Chamando repository de revistas "]);
      return magazines;
    } catch (error) {
      logger.warn(`Erro ao chamar repositório de revistas ${error}`);
      return null;
    }
  }

  /**
   * @method publicMagazineID
   * @description Recupera uma revista específica com dados públicos com base no ID fornecido.
   *
   * @param {number} id - ID da revista a ser recuperada.
   * @returns {Promise<Partial<MagazineOutputDTO | null>>} Retorna os dados públicos da revista ou null se não encontrada.
   *
   * @throws {NotFoundError} Caso a revista não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro ao chamar o repositório de revistas.
   */
  async publicMagazineID(
    id: number
  ): Promise<Partial<MagazineOutputDTO | null>> {
    logger.info("Iniciando UseCase buscar revista com dados públicos");
    const magazines = await this.magazineRepo.findID(id);
    if (!magazines) {
      logger.warn(`Revista não encontrada`);
      throw new NotFoundError("Revista não encontrada");
    }
    try {
      // Instância da entity Magazine responsável por filtrar os dados do repositório e listar apenas os públicos
      const data = Magazine.publicDataMagazine(magazines);

      return data;
    } catch (error) {
      logger.error(`Erro ao chamar repositório de revistas ${error}`);
      throw new BadRequestError("Erro use case revistas ");
    }
  }

  /**
   * @private
   * @method prepareQuery
   * @description Prepara os parâmetros de consulta para busca de revistas.
   *
   * @param {Partial<QueryMagazine>} query - Parâmetros de consulta parciais fornecidos pelo usuário.
   * @returns {QueryMagazine} Retorna os parâmetros de consulta preparados.
   */
  private prepareQuery(query: Partial<QueryMagazine>): QueryMagazine {
    const take = Number(query.take) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * take;
    const queryParams: QueryMagazine = {
      take,
      skip,
    };
    if (query.name) queryParams.name = query.name;
    if (query.volume) queryParams.volume = query.volume;
    if (query.company) queryParams.company = query.company;
    if (query.author) queryParams.author = query.author;
    if (query.category) queryParams.category = query.category;

    return queryParams;
  }
}
