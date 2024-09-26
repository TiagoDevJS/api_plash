import { LibraryRepositoryInterace } from "../../Interfaces/Library/LibraryRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import { singleton } from "tsyringe/dist/decorators";
import { BadRequestError } from "../../handleError/errors";
import logger from "../../adapters/winstomLogger";
import { LibraryInputDTO } from "../../DTO/Library/inputDTO";

@singleton()
export class LibraryRepository implements LibraryRepositoryInterace {
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  async create(input: LibraryInputDTO): Promise<string | null> {
    const { id, magazines } = input;
    const params = {
      where: {
        id: id,
      },
      data: {
        magazinesRef: {
          connectOrCreate: magazines.map((magazine: any) => ({
            where: { id: magazine.id }, // ID da revista para conexão
            create: {
              // Campos para criar um novo registro se não encontrado
              name: magazine.name,
              author: magazine.author,
              cover: magazine.cover,
              company: magazine.company,
              volume: magazine.volume,
              description: magazine.description,
            },
          })),
        },
      },
    };
    try {
      const create = await this.prisma?.libraryUser.update({
        where: {
          id: params.where.id,
        },
        data: params.data,
      });
      logger.info(`Revistas adicionadas ou conectadas com sucesso!`);
      return `Dados inseridos na biblioteca com sucesso!`;
    } catch (error) {
      logger.error(
        `Erro ao adicionar os dados na biblioteca do cliente  :${error}`
      );
      throw new BadRequestError(`Erro ao adicionar as revistas ao cliene `);
    }
  }
}
