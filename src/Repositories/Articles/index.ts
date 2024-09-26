import {
  FilterQuery,
  ArticleRepositoryInterface,
} from "../../Interfaces/Articles/IRepository";
import prisma from "../../Frameworks/server/prisma";
import { singleton } from "tsyringe/dist/decorators";
import { ArticleOutputDto } from "../../DTO/Articles/outputDTO";
import {
  createArticleInputDTO,
  updateArticleInputDTO,
} from "../../DTO/Articles/inputDTO";
import logger from "../../adapters/winstomLogger";
import { Prisma } from "@prisma/client";
//Repository: Responsavel pela logica de inserçao, atualização , remoção e  busca de artigos no sistema.
@singleton()
export class ArticlesRepository implements ArticleRepositoryInterface {
  prisma = prisma;

  constructor() {
    //Instancia do banco de dados
    this.prisma = prisma;
  }
  //Bbusca todos os artigos do sistema com  parametros de busca
  async findAll(
    query: FilterQuery
  ): Promise<{ articles: ArticleOutputDto[]; finalPage: number } | null> {
    logger.info(`[Iniciando o repositorio de artigos]`);
    try {
      const filter = {
        where: {
          name: {
            contains: query.queryParams.name as string,
            mode: Prisma.QueryMode.insensitive,
          },
          author: {
            contains: query.queryParams.author as string,
            mode: Prisma.QueryMode.insensitive,
          },
          company: {
            contains: query.queryParams.company as string,
            mode: Prisma.QueryMode.insensitive,
          },

          status: {
            contains: query.queryParams.status as string,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      };
      const articles = await this.prisma?.articles.findMany({
        take: Number(query.take),
        skip: Number(query.skip),
        where: filter.where,
        include: {
          magazine: true,
          categories: true,
        },
      });

      const listCount: number | undefined = await prisma?.articles.count({
        where: filter.where,
      });
      const finalPage = Math.ceil((listCount as number) / Number(query.take));

      logger.info(`[Artigos encontrados: ${articles?.length}]`);
      return { articles: articles as ArticleOutputDto[], finalPage };
    } catch (error) {
      logger.warn(`Erro ao buscar artigos ${error}`);
      return null;
    }
  }
  //Busca um artigo no sistema
  async findID(id: number): Promise<ArticleOutputDto | null> {
    logger.info(`[Buscando artigo por ID: ${id}]`);

    try {
      const article = await this.prisma?.articles.findUnique({
        where: { id: Number(id) },
      });
      logger.info(`[Artigo encontrado: ID ${id}]`);
      return article as ArticleOutputDto;
    } catch (error) {
      logger.warn(`[Artigo não encontrado: ID ${id}]`);
      return null;
    }
  }
  //Busca artigos no sistema baseados em status , free, trend...
  async findAllByStatus(
    status?: string,
    views?: number
  ): Promise<ArticleOutputDto[] | null> {
    logger.info(
      `[Buscando artigos por status: ${status} e visualizações: ${views}]`
    );

    try {
      const articles = await prisma?.articles.findMany({
        where: {
          status,
          views: {
            gte: views ? views : undefined,
          },
        },
        select: {
          id: true,
          author: true,
          company: true,
          views: true,
          name: true,
          description: true,
          cover: true,

          status: true,

          magazine: true,
        },
      });

      logger.info(`[Artigos encontrados: ${articles?.length}]`);

      return articles as ArticleOutputDto[];
    } catch (error) {
      logger.error(`Erro ao buscar artigos ${error}`);
      return null;
    }
  }
  //Cria artigos no sistema
  async create(input: createArticleInputDTO): Promise<string | null> {
    console.log(input)
    try {
      const data = {
        author: input.author,
        company: input.company,
        name: input.name,
        description: input.description,
        cover: input.cover,
        magazineId: Number(input.magazineId),
        categoriesId: Number(input.categoriesId),
        status: input.status,
      };
      const create = await this.prisma?.articles.create({ data });

      logger.info(`[Artigo criado com sucesso: ID ${create?.id}]`);
      return `Artigo ${create?.id} criado com sucesso`;
    } catch (error: unknown) {
      logger.error(`Erro ao criar artigo: ${error}`);
      return null;
    }
  }
  //Atualiza artigos no sistema
  async update(
    id: number,
    input: updateArticleInputDTO
  ): Promise<string | null> {
    try {
      const data = {
        author: input.author,
        company: input.company,
        name: input.name,
        description: input.description,
        categoriesId: Number(input.categoriesId),
        magazineId: Number(input.magazineId),
        status: input.status,
        cover: input.cover,
      };
      const update = await this.prisma?.articles.update({
        where: { id },
        data,
      });
      logger.info(`[Artigo atualizado com sucesso: ID ${update?.id}]`);
      return `Artigo ${update?.id} atualizado com sucesso`;
    } catch (error: any) {
      logger.error(`Erro ao atualizar artigo: ${error}`);
      return null;
    }
  }
  //Deleta artigos no sistema
  async deleteByID(id: number): Promise<string | null> {
  
    try {
      const deleteArticle = await prisma?.articles.delete({
        where: { id: Number(id) },
      });

      logger.info(`[Artigo deletado com sucesso: ID ${deleteArticle?.name}]`);
      return `Artigo ${deleteArticle?.id} deletado com sucesso`;
    } catch (error: any) {
      logger.error(`Erro ao deletar artigo: ${error}`);
      return null;
    }
  }
}
