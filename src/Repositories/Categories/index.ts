import { singleton } from "tsyringe/dist/decorators";
import { CategoriesOutputDto } from "../../DTO/Categories";
import { ICategoriesRepo } from "../../Interfaces/Categories/IRepoCategorie";
@singleton()
export class CategoriesRepository implements ICategoriesRepo {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async findAll(): Promise<CategoriesOutputDto[] | null> {
    const categories = await this.prisma?.categories.findMany({
      select: {
        id: true,
        name: true,
        magazine: {
          select: {
            id: true,
            author: true,
            company: true,
            model: true,
            cover: true,
            slug: true,
            name: true,
            volume: true,
            views: true,
            price: true,
            description: true,
          },
        },
      },
    });

    return categories ? (categories as CategoriesOutputDto[]) : null;
  }
  async findID(id: number): Promise<CategoriesOutputDto | null> {
    const category = await this.prisma?.categories.findUnique({
      where: { id: Number(id) },
      include: {
        magazine: {
          select: {
            author: true,
            Category: true,
            cover: true,
            company: true,
            name: true,
            price: true,
            volume: true,
            id: true,
            description: true,
            model: true,
            article: true,
          },
        },
      },
    });

    return category as CategoriesOutputDto;
  }
  async create(name: string): Promise<string | null> {
    const data = await this.prisma?.categories.create({
      data: {
        name: name,
      },
    });
    return data?.id ? "Categoria criada com sucesso" : null;
  }
  async update(id: number, name: string): Promise<any | null> {
    const existCat = await this.findID(id);
    if (!existCat) {
      return null;
    }
    await prisma?.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return existCat.id
      ? `Categoria ${existCat.id} atualizada com sucesso`
      : null;
  }
  async delete(id: number): Promise<any | null> {
    const existCat = await this.findID(id);
    if (!existCat) {
      return null;
    }
    await this.prisma?.categories.delete({
      where: {
        id: Number(id),
      },
    });
    return existCat.id
      ? `Categoria ${existCat.id} atualizada com sucesso`
      : null;
  }
}
