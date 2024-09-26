import { inject, singleton } from "tsyringe/dist/decorators";
import { IUpdateCategories } from "../../Interfaces/Categories/IUpdateUseCase";
import { CategoriesRepository } from "../../Repositories/Categories";

@singleton()
export class UpdateCategoriesUseCase implements IUpdateCategories{
    constructor(
        //@ts-ignore
        @inject(CategoriesRepository)
        private readonly updateCategoriesRepo:CategoriesRepository
    ){

    }
    async update(id: number, name: string): Promise<any | null> {
         const data = await this.updateCategoriesRepo.update(id,name)
         return data
    }
}