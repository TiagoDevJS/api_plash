import { inject, singleton } from "tsyringe/dist/decorators";
import { ArticlesRepository } from "../../Repositories/Articles";
import { ArticleOutputDto } from "../../DTO/Articles/outputDTO";
import { FilterQuery } from "../../Interfaces/Articles/IRepository";
import { IArticleUseCaseInterface } from "../../Interfaces/Articles/IArticleGetUseCase";
import Logger from "../../adapters/winstomLogger";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

@singleton()
// Funçao responsavel por enviar e manipular os dados para buscar dados no banco de dados
// Para uma melhorar a estrutura futuramente  possivel Logica pode ser refatorada para getArticlesByStatus
export class GetArticlesUseCase implements IArticleUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(ArticlesRepository) private readonly articleRepo: ArticlesRepository //@ts-ignore
  ) {}

  async getAllArticles({
    query,
  }: any): Promise<{ articles: ArticleOutputDto[]; finalPage: number } | null> {
    try {
      const queryParams = this.OutputQueryFilter(query);
      const articles = await this.articleRepo.findAll(queryParams);
      if (articles?.articles.length === 0) {
        logger.info(`Nenhum artigo encontrado!`);
        throw new NotFoundError(`Nenhum artigo encontrado`);
      }
      return articles;
    } catch (error) {
      logger.error(`Erro ao buscar artigos : ${error}`);
      throw new BadRequestError(`Erro ao buscar artigos`);
    }
  }
  async getArticleID(id: number): Promise<any> {
    const existArticle = await this.articleRepo.findID(id);
    if (!existArticle) {
      logger.info(`Nenhum artigo encontrado`);
      throw new NotFoundError(`Nenhum artigo encontrado`);
    }
    try {
      const data = await this.articleRepo.findID(id);
      logger.info(`[Artigo econtrado  ID: ${id}]`);
      return data;
    } catch (error) {
      logger.error(`Erro ao buscar artigo : ${error}`);
      throw new BadRequestError(`Erro ao  buscar artigos `);
    }

    return;
  }
  async getArticlesTrend(): Promise<ArticleOutputDto[] | null> {
    try {
      const articles = await this.articleRepo.findAllByStatus("trend");
      if (articles?.length === 0) {
        logger.info(`Nenhum artigo encontrado`);
        throw new NotFoundError(`Nenhum artigo encontrado`);
      }
      return articles;
    } catch (error) {
      logger.error(`Erro use case artigos ${error}`);
      throw new BadRequestError(`Erro usecase artigos`);
    }
  }
  async getMostViews(): Promise<ArticleOutputDto[] | null> {
    try {
      const articles = await this.articleRepo.findAllByStatus("", 3);
      if (articles?.length === 0) {
        logger.info(`Nenhum artigo encontrado`);
        throw new NotFoundError(`Nenhum artigo encontrado`);
      }
      return articles;
    } catch (error) {
      logger.error(`Erro use case artigos ${error}`);
      throw new BadRequestError(`Erro usecase artigos`);
    }
  }
  async getArticlesFree(): Promise<ArticleOutputDto[] | null> {
    try {
      const articles = await this.articleRepo.findAllByStatus("free");
      if (articles?.length === 0) {
        logger.info(`Nenhum artigo encontrado`);
        throw new NotFoundError(`Nenhum artigo encontrado`);
      }
      return articles;
    } catch (error) {
      logger.error(`Erro use case artigos ${error}`);
      throw new BadRequestError(`Erro usecase artigos`);
    }
  }
  async getArticlesRecommended(): Promise<ArticleOutputDto[] | null> {
    try {
      const articles = await this.articleRepo.findAllByStatus("recommended");
      if (articles?.length === 0) {
        logger.info(`Nenhum artigo encontrado`);
        throw new NotFoundError(`Nenhum artigo encontrado`);
      }
      return articles;
    } catch (error) {
      logger.error(`Erro use case artigos ${error}`);
      throw new BadRequestError(`Erro usecase artigos`);
    }
  }
  private OutputQueryFilter(query: any): FilterQuery {
    const take = Number(query.take) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * take;

    return {
      take,
      skip,
      queryParams: {
        author:query.author || "",
        company: query.company || "",
        status: query.status || "",
        name: query.name || "",
      },
    };
  }
}
