import { inject, singleton } from "tsyringe/dist/decorators";
import { ICreateCategories } from "../../Interfaces/Categories/IPostUsecase";
import { CategoriesRepository } from "../../Repositories/Categories";
import { DeleteCategoriesInterface } from "../../Interfaces/Categories/IDeleteUseCase";

@singleton()
export class DeleteCategoriesUseCase implements DeleteCategoriesInterface {
  constructor(
    //@ts-ignore
    @inject(CategoriesRepository)
    private readonly categoriesRepo: CategoriesRepository
  ) {}
  async delete(id: number): Promise<string | null> {
    return await this.categoriesRepo.delete(id);
  }
}