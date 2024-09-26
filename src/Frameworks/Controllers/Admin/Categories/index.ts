import { container } from "tsyringe";
import { ICategoriesController } from "../../../../Interfaces/Categories/ICategoriesController";
import { GetCategoriesUseCase } from "../../../../UseCases/Categories/getCategoriesUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { notFound, ok, serverError } from "../../Helpers/helperError";
import { UpdateCategoriesUseCase } from "../../../../UseCases/Categories/updateCategoriesUseCase";
import { PostCategoriesUseCase } from "../../../../UseCases/Categories/postCategoriesUSeCase";
import { DeleteCategoriesUseCase } from "../../../../UseCases/Categories/delCategoriesUseCase";

export class CategoriesController implements ICategoriesController {
  private useCaseCategories: GetCategoriesUseCase;
  private updateUseCaseCategories : UpdateCategoriesUseCase
  private createUseCaseCategories: PostCategoriesUseCase
  private deleteUseCaseCategories: DeleteCategoriesUseCase
  constructor() {
    this.useCaseCategories = container.resolve(GetCategoriesUseCase);
    this.updateUseCaseCategories = container.resolve(UpdateCategoriesUseCase);
    this.createUseCaseCategories = container.resolve(PostCategoriesUseCase)
    this.deleteUseCaseCategories = container.resolve(DeleteCategoriesUseCase)
  }
  async findAll(): Promise<HttpResponse<unknown>> {
    try {
      const categories = await this.useCaseCategories.findAll();
      if (!categories) {
        return notFound("Categorias nâo encontradas");
      }
      return ok(categories);
    } catch (error) {
      return serverError();
    }
  }

  async findID(id: number): Promise<HttpResponse<unknown>> {
    try {
      const categories = await this.useCaseCategories.findID(id);
      if (!categories) {
        return notFound("Categoria nâo encontradas");
      }
      return ok(categories);
    } catch (error) {
      return serverError();
    }
  }
  async create(name: string): Promise<HttpResponse<unknown>> {
    try {
      const update = await this.createUseCaseCategories.create(name);
      if (!update) {
        return notFound("Categoria nâo encontrada");
      }
      return ok(update);
    } catch (error) {
      return serverError();
    }
  }
  async update(id: number, name: string): Promise<HttpResponse<unknown>> {
    try {
      const update = await this.updateUseCaseCategories.update(id,name);
      if (!update) {
        return notFound("Categoria nâo encontrada");
      }
      return ok(update);
    } catch (error) {
      return serverError();
    }
  }

  async delete(id: number): Promise<HttpResponse<unknown>> {
    
    try {
      const update = await this.deleteUseCaseCategories.delete(id);
      if (!update) {
        return notFound("Categoria nâo encontrada");
      }
      return ok(update);
    } catch (error) {
      return serverError();
    }
  }
}
