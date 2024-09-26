import { inject, singleton } from "tsyringe/dist/decorators";
import { ICreateCategories } from "../../Interfaces/Categories/IPostUsecase";
import { CategoriesRepository } from "../../Repositories/Categories";

@singleton()
export class PostCategoriesUseCase implements ICreateCategories {
  constructor(
    //@ts-ignore
    @inject(CategoriesRepository)
    private readonly categoriesRepo: CategoriesRepository
  ) {}
  async create(name: string): Promise<string | null> {
    return await this.categoriesRepo.create(name);
  }
}
