import { Employee } from "../../Entities/employee";
import { EmployeeInterfaceRepository } from "../../Interfaces/Employees/EmployeeRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import { singleton } from "tsyringe/dist/decorators";
import logger from "../../adapters/winstomLogger";
import { createEmployeeDTO, QueryEmployee } from "../../DTO/Employees/inputDTO";
import { EmployeeOutputDTO } from "../../DTO/Employees/outputDTO";
import { Prisma } from "@prisma/client";
@singleton()
export class EmployeeRepository implements EmployeeInterfaceRepository {
  prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  // Cria um colaborador no sistema
  async create(input: Employee): Promise<string | null> {
    logger.info(`Iniciando repositorio : Criar colaborador`);
    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
      profession: input.profession,
      commission: input.commission,
      avatar: input.avatar,
    };

    try {
      const create = await this.prisma?.employee.create({
        data,
      });
      logger.info(`Colaborador criado com sucesso!`);
      return create?.id ? "Colaborado criado com sucesso" : null;
    } catch (error) {
      logger.error(`Erro ai criar colaborador ${error}`);
      return null;
    }
  }
  // Atualiza um colaborador no sistema
  async update(id: number, input: Employee): Promise<string | null> {
    logger.info(`Inicando respository `);
    const existEmployee = await this.findID(id);

    try {
      const data = {
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        profession: input.profession,
        commission: input.commission,
        avatar: input.avatar,
      };
      const update = await this.prisma?.employee.update({
        where: {
          id,
        },
        data,
      });
      logger.info(
        `O colaborador ${existEmployee?.id} foi atualizado  com sucesos!`
      );
      return `O colaborador ${existEmployee?.id}`;
    } catch (error) {
      logger.error(`Erro ao atualizar o colaborador : ${error}`);
      return null;
    }
  }
  // Deleta um colaborador no sistema
  async delete(id: number): Promise<string | null> {
    const existEmployee = await this.findID(id);

    try {
      const deleteEmployee = await this.prisma?.employee.delete({
        where: {
          id,
        },
      });
      logger.info(
        `O colaborador ${deleteEmployee?.id} foi atualizado com sucesos!`
      );
      return `O colaborador ${deleteEmployee?.id} foi deletado com sucesos!`;
    } catch (error) {
      logger.error(`Erro ao atualizar o colaborador : ${error}`);
      return null;
    }
  }
  // Busca todos os colaborador no sistema
  async findAll(query: QueryEmployee): Promise<{employees:EmployeeOutputDTO[]; finalPage:number }| null> {
     console.log(query)
    logger.info(`Iniciando repositorio : Buscar colaboradores`);
    try {
      const filter = {
        where: {
          name: {
            contains: query.name,
            mode: Prisma.QueryMode.insensitive,
          },
          email: {
            contains: query.email,
            mode: Prisma.QueryMode.insensitive,
          },
          profession: {
            contains: query.profession,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      };
   
      const employees = await this.prisma?.employee.findMany({
        take: Number(query.take),
        skip: Number(query.skip),
        where: filter.where,
      });
      const listCount = await prisma?.employee.count({
        where: filter.where,
      });
      const finalPage = Math.ceil(Number(listCount) / Number(query.take));
      logger.info(`Colaboradores  encontrados  ${employees?.length}`);
      return { employees:employees as EmployeeOutputDTO[] , finalPage};
    } catch (error) {
      logger.error(`Erro ai criar colaborador ${error}`);
      return null;
    }
  }
  // Busca um colaborador no sistema
  async findID(id: number): Promise<EmployeeOutputDTO | null> {
    try {
      const employee = await this.prisma?.employee.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          profession: true,
          phone: true,
          commission: true,
          avatar: true,
        },
      });
      if (!employee) {
        logger.info(`Colaborador nao encontrado `);
        return null;
      }

      return employee as EmployeeOutputDTO;
    } catch (error) {
      logger.error(`Erro ao atualizar o colaborador : ${error}`);
      return null;
    }
  }
  //Busca um colaborador por email
  async findByEmail(email: string): Promise<EmployeeOutputDTO | null> {
    try {
      const employee = await this.prisma?.employee.findUnique({
        where: {
          email,
        },
      });

      return employee as EmployeeOutputDTO;
    } catch (error) {
      logger.error(`Erro ao atualizar o colaborador : ${error}`);
      return null;
    }
  }
  //Paga a comissao para um colaborador 
  async payEmployee(id:number, pay:number):Promise<string | null>{
    try {
      const employee = await prisma?.employee.update({
        where: {
          id: Number(id),
        },
        data: {
          availableForWithdrawal: {
            decrement: Number(pay),
          },
        },
      });
      return `Pagamento para ${employee?.name} foi  efetuado  com sucesso! ` ;
    } catch (error) {
       logger.error(`Erro ao efeutar pagamento : ${error}`)
      return null
    }
   
  }
}
