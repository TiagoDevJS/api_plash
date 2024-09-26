
import { IArticleControllerInterface } from "../../../../Interfaces/Controllers/Articles/postInterfaceArticleController";
import { ok } from "../../Helpers/helperError";
import { HttpResponse } from "../../Helpers/protocolos";
import { PostArticleUseCase } from "../../../../UseCases/Articles/postArticlesUseCase";
import { container } from "tsyringe";
import { createArticleInputDTO, updateArticleInputDTO } from "../../../../DTO/Articles/inputDTO";
import { GetArticlesUseCase } from "../../../../UseCases/Articles/getArticlesUseCase";
import { UpdateArticleUseCase } from "../../../../UseCases/Articles/updateArticlesUseCase";
import { DeleteArticleUseCase } from "../../../../UseCases/Articles/deleteArticlesUseCase";
import logger from "../../../../adapters/winstomLogger";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { articleSchema } from "../../../../schemas/articlesValadation";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
export class ArticlesController implements IArticleControllerInterface {
  private articleUseCasePost: PostArticleUseCase;
  private articleUseCaseGet: GetArticlesUseCase;
  private articleUseCaseUpdate : UpdateArticleUseCase;
  private articleUseCaseDelete : DeleteArticleUseCase
  constructor() {
    this.articleUseCasePost = container.resolve(PostArticleUseCase);
    this.articleUseCaseGet = container.resolve(GetArticlesUseCase)
    this.articleUseCaseUpdate = container.resolve(UpdateArticleUseCase)
    this.articleUseCaseDelete = container.resolve(DeleteArticleUseCase)
  }
//Controller Create Article
  async create(input: createArticleInputDTO):Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(articleSchema, input)
      const create = await this.articleUseCasePost.create(result);
      logger.info(`Artigo criado com sucesso! `)
      return ok(create);
    } catch (error:any) {
      logger.error(`Erro ao criar  artigo : ${error} `)
      return handleErrorResponse(error)
    }
  }
  //Controller Update Article
  async update(id:number,input: updateArticleInputDTO):Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(articleSchema, input)
      const update = await this.articleUseCaseUpdate.update(id,result);
      
      logger.info(`Artigo ${id} atualizado com sucesso! `)
      return ok(update);
    } catch (error:any) {
      logger.error(`Erro ao atualizar artigo: ${error} `)
      return handleErrorResponse(error)
    }
  }
//Controller get Article ${ID}
  async findID(id:number):Promise<HttpResponse<unknown>>{
    try {
      const find = await this.articleUseCaseGet.getArticleID(id);
      logger.info(`[Artigo buscado por ID: ${find.id}]`);
      return ok(find);
    } catch (error:any) {
      logger.error(`Erro ao buscar artigo: ${error}`);
      return handleErrorResponse(error)
    }
  }
//Controller Delete Article
  async delete(id: number): Promise<HttpResponse<unknown>> {
    try {
    
      const deleteArticle = await this.articleUseCaseDelete.delete(id);
      logger.info(`Artigo ${id} foi deletado com sucesso  `)
      return ok(deleteArticle);
    } catch (error:any) {
      logger.error(`Erro ao deletar artigo :${error} `)
      return handleErrorResponse(error);
    }
  }
  //Controller Get All Article
  async findAll(query:any): Promise<HttpResponse<unknown>> {
 
   
    try {
      const articles = await this.articleUseCaseGet.getAllArticles({query});
      logger.info(`Artigos encontrados ${articles?.articles.length} `)
      return ok(articles);
    } catch (error:any) {
      logger.error(`Erro ao buscar artigos `)
      return handleErrorResponse(error);
    }
  }



}
