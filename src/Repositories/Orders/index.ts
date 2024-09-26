import { OrderInputDTO, QueryOrders } from "../../DTO/Orders/inputDTO";
import { OrderoutpuDTO } from "../../DTO/Orders/outputDTO";
import { OrderRepositoryInterface } from "../../Interfaces/Orders/OrdersRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import { Order } from "../../Entities/oders";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";
import { access } from "fs";
import { SSEKMSFilterSensitiveLog } from "@aws-sdk/client-s3";
import { Prisma } from "@prisma/client";
export class OrderRepository implements OrderRepositoryInterface {
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  async create(input: Order): Promise<string | null> {
    try {
      const data = {
        city: input.city,
        userId: input.userId,
        amout: input.amout,
        name: input.name,
        email: input.email,
        street: input.street,
        street_number: input.street_number,
        complement: input.complement,
        zip_code: input.zip_code,
        neighborhood: input.neighborhood,
        state: input.state,
        country: input.country,
        phone: input.phone,
        items: input.items,
        codeEnv: "",
      };
      const order = await this.prisma?.orders.create({
        data,
      });
      logger.info(`Ordem de serviço criada com sucesso ${order?.id}`);
      return `Ordem de serviço criada com sucesso!`;
    } catch (error: any) {
      logger.error(`Erro ao criar a ordem de serviço ${error.message}`);
      throw new BadRequestError(`Erro ao criar a ordem de serviço `);
    }
  }
  async update(id: number, input: OrderInputDTO): Promise<string> {
    try {
      const data = {
        status: input.status,
        codeEnv: input.codeEnv,
      };
      const update = await this.prisma?.orders.update({
        where: {
          id: id,
        },
        data,
      });
      logger.info(`Order ${update?.id} atualizada com sucesso!`);
      return "Ordem de serviço atualizada com sucesso!";
    } catch (error) {
      logger.error(`Erro ao atualizar a ordem de serviço ${error}`);
      throw new BadRequestError(`Erro ao atualizar a ordem de serviço `);
    }
  }
  async findID(id: number): Promise<OrderoutpuDTO | null> {
    try {
      const order = await this.prisma?.orders.findUnique({
        where: {
          id,
        },
      });
      return order ? (order as OrderoutpuDTO) : null;
    } catch (error) {
      logger.error(`Erro ao buscar a order ${id} error : ${error}`);
      throw new BadRequestError(`Erro ao buscar a ordem de serviço`);
    }
  }
  async findAll(
    query: QueryOrders
  ): Promise<{ orders: OrderoutpuDTO[]; finalPage: number }> {
    console.log(query)
    try {
      const filter = {
        take: Number(query.take),
        skip: Number(query.skip),
        where: {
           id: Number(query.id) ? Number(query.id) : undefined,
          name: {
            contains: query.name,
            mode: Prisma.QueryMode.insensitive,
          },
          email: {
            contains: query.email,
            mode: Prisma.QueryMode.insensitive,
          },
          city: {
            contains: query.city,
            mode: Prisma.QueryMode.insensitive,
          },
          status: {
            equals: query.status,
          },
        },
      };
      const orders = await this.prisma?.orders.findMany({
        take: filter.take,
        skip: filter.skip,
        where: filter.where,
      });
      const listCount = await prisma?.orders.count({ where: filter.where });
      const finalPage = Math.ceil(Number(listCount) / Number(filter.take));
      return { orders: orders as OrderoutpuDTO[], finalPage };
    } catch (error) {
      logger.error(`Erro ao buscar as orders de serviço :${error}`);
      throw new BadRequestError(`Erro ao buscar as orders de serviço.`);
    }
  }
}
