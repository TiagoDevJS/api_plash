import { Dvl } from "../../Entities/dvls";
import { DvlRepositoryInterface } from "../../Interfaces/Dvls/DvlRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";
import { DvlOutupDTO } from "../../DTO/Dvls/outputDTO";
import { PrismaClient } from "@prisma/client";

export class DvlsRepository implements DvlRepositoryInterface {
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  async create(input: Dvl): Promise<string> {
    try {
      const data: Dvl = {
        userId: input.userId,
        name: input.name,
        price: input.price,
        toReceive: input.toReceive,
        picture: input.picture,
        paidOut: input.paidOut,
        keyPayment: input.keyPayment,
      };
      const dvls = await this.prisma?.dvls.create({
        data,
      });
      logger.info(
        `Divisao de lucro criada com sucesso para usuario ${input.userId}`
      );
      return `Divisão de lucro criada com sucesso!`;
    } catch (error) {
      logger.error(`Erro ao criar divisão de lucro ${error} `);
      throw new BadRequestError(`Erro ao criar divisão de lucro `);
    }
  }
  async createDvlAdmin(input: Dvl): Promise<string> {
    try {
      const data = {
        name: input.name,
        price: input.price,
        toReceive: input.toReceive,
        picture: input.picture,
        paidOut: input.paidOut,
        keyPayment: input.keyPayment,
      };
      const dvls = await this.prisma?.dvlsPaymentAdmin.create({
        data,
      });
      logger.info(
        `Divisao de lucro criada com sucesso para usuario ${input.userId}`
      );
      return `Divisão de lucro criada com sucesso!`;
    } catch (error) {
      logger.error(`Erro ao criar divisão de lucro ${error} `);
      throw new BadRequestError(`Erro ao criar divisão de lucro `);
    }
  }
  async findAll(): Promise<DvlOutupDTO[]> {
    try {
      const dvls = await this.prisma?.dvls.findMany({
        select: {
          id: true,
          name: true,
          paidOut: true,
          toReceive: true,
          picture: true,
          price: true,
        },
      });

      return dvls as DvlOutupDTO[];
    } catch (error) {
      logger.error(error);
      throw new BadRequestError(`Erro ao listar os dados de dvls`);
    }
  }
  async findID(id: number): Promise<Dvl | null> {
    throw "";
  }
  async findAllByIDS(ids: number[]): Promise<DvlOutupDTO[]> {
    try {
      const dvlsByIDS = await this.prisma?.dvls.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return dvlsByIDS as DvlOutupDTO[];
    } catch (error) {
      logger.error(`Erro ao listar dvls :${error}`);
      throw new BadRequestError(`Erro ao listar dvl `);
    }
  }
  async update(ids: number[], pay: number): Promise<{ids:number[]; receive:number}> {
    try {
      // 1. Obtendo a soma total do toReceive antes da atualização
  
  
      // 2. Atualizando dvls
      await this.prisma?.$transaction(async (prisma) => {
        // Atualizando dvls para 'active' e alterando os valores
        await prisma.dvls.updateMany({
          where: {
            id: {
              in: ids,
            },
            status: {
              in: ['pending', 'active'],
            },
            paidOut: {
              gte: 0,
            },
          },
          data: {
            toReceive: {
              increment: Number(pay),
            },
            paidOut: {
              decrement: Number(pay),
            },
            status: 'active',
          },
        });
  
        // 3. Atualizando os usuários relacionados
       
      });
      const totalReceive = await this.prisma?.dvls.aggregate({
        _sum: {
          toReceive: true,
        },
        where: {
          id: {
            in: ids,
          },
        },
      });
  
      return { ids:ids ,receive:totalReceive?._sum.toReceive as number };
    } catch (error: any) {
      logger.error(`Erro ao pagar dvls em massa: ${error}`);
      throw new BadRequestError(
        `Erro ao atualizar o pagamento em massa dos dvls ${error.message}`
      );
    }
  }
}


