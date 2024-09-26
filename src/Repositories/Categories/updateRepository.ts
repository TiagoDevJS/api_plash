import { inject, singleton } from "tsyringe/dist/decorators";
import { ICategoriesRepo } from "../../Interfaces/Categories/IRepoCategorie";
import { CategoriesRepository } from ".";

@singleton()
export class UpdateCategoriesRepository {
    prisma = prisma;

    constructor(
        //@ts-ignore
        @inject(CategoriesRepository)
        private readonly getCategoriesRepo:CategoriesRepository
    ) {
      this.prisma = prisma;
    }
    async update(id: number, name: string): Promise<any | null> {
        const existCat = await this.getCategoriesRepo.findID(id)
        if(!existCat){
            return null
        }
        await prisma?.categories.update({
            where: {
              id: Number(id),
            },
            data: {
              name: name,
            },
          });
        return  existCat.id ? `Categoria ${existCat.id} atualizada com sucesso` : null
    }

   
    
}