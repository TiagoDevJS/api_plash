import { container } from "tsyringe";
import { IGetControllerArticleInterface } from "../../../../Interfaces/Controllers/Articles/getInterfaceArticleController";
import { GetArticlesUseCase } from "../../../../UseCases/Articles/getArticlesUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { notFound, ok, serverError } from "../../Helpers/helperError";

export class GetArticlesController implements IGetControllerArticleInterface {
  private articlesUseCaseGet: GetArticlesUseCase;
  constructor() {
    this.articlesUseCaseGet = container.resolve(GetArticlesUseCase);
  }

  async getArticleID(id: string): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getArticleID(Number(id));
    if (!articles || articles.length === 0) {
      return notFound("Artigo não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
  async getAarticlesFree(): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getArticlesFree();
    if (!articles || articles.length === 0) {
      return notFound("Artigos gratuitos não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
  async getAarticlesMostView(): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getMostViews();
    if (!articles || articles.length === 0) {
      return notFound("Artigo mais visualizados não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
  async getAarticlesTrend(): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getArticlesTrend();
    if (!articles || articles.length === 0) {
      return notFound("Artigo tendencias não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
  async getArticlesMostRead(): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getArticlesTrend();
    if (!articles || articles.length === 0) {
      return notFound("Artigo mais lidos não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
  async getArticlesRecommended(): Promise<HttpResponse<unknown>> {
    const articles = await this.articlesUseCaseGet.getArticlesRecommended();
    if (!articles || articles.length === 0) {
      return notFound("Artigo mais lidos não encontrados");
    }
    try {
      return ok(articles);
    } catch (error) {
      return serverError();
    }
  }
}
