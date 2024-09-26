import { inject, singleton } from "tsyringe/dist/decorators";
import { IGetCategoriesInterface } from "../../Interfaces/Categories/IGetUseCase";
import { CategoriesRepository } from "../../Repositories/Categories";

@singleton()
export class GetCategoriesUseCase  implements IGetCategoriesInterface {
    constructor(
        //@ts-ignore
        @inject(CategoriesRepository)
        private readonly categoriesRepo:CategoriesRepository
    ){

    }
  async findAll(): Promise<any> {
    return await this.categoriesRepo.findAll()
}
async findID(id: number): Promise<any> {
    return await this.categoriesRepo.findID(id)
}
}