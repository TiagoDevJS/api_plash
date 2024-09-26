import {
  createMagzineInputDTO,
  QueryMagazine,
  updateMagazineInputDTO,
} from "../../DTO/Magazines/inputDTO";
import { MagazineRepositoryInterface } from "../../Interfaces/Magazines/MagazineRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import { MagazineOutputDTO } from "../../DTO/Magazines/outputDTO";
import { singleton } from "tsyringe/dist/decorators";
import logger from "../../adapters/winstomLogger"; // Funçao helper do wistom logger para exibir logs personalizados no sistema
import { Magazine } from "../../Entities/magazine";
import { Prisma } from "@prisma/client";
import { BadRequestError } from "../../handleError/errors";

@singleton()
export class MagazineRepository implements MagazineRepositoryInterface {
  //Istancia do banco de dados
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  //Retorna todas as revistas
  async findAll(query: QueryMagazine): Promise<{magazines:MagazineOutputDTO[]; finalPage:number} | null> {
    logger.info(`[Iniciando o repositorio de revistas]`);
    try {
       const filter = {
        
        where: {
          name: {
            contains: query.name,
            mode: Prisma.QueryMode.insensitive,
          },
          author: {
            contains: query.author,
            mode: Prisma.QueryMode.insensitive,
          },
          company: {
            contains: query.company,
            mode: Prisma.QueryMode.insensitive,
          },
          volume: {
            contains: query.volume,
            mode: Prisma.QueryMode.insensitive,
          },
          Category: {
            name: {
              contains: query.category,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
       }
      const magazines = await this.prisma?.magazines.findMany({
        take: Number(query.take),
        skip: Number(query.skip),
        where:filter.where,
        include: {
          article: true,
          Category: true,
          employees: true,
        },
      });
      const listCount: any = await prisma?.magazines.count({
        where:filter.where
      });
      const finalPage = Math.ceil(Number(listCount) / Number(query.take));
      logger.info(`[Revistas encontradas: ${magazines?.length}]`);
      return {magazines:(magazines as MagazineOutputDTO[]), finalPage}
    } catch (error) {
      logger.warn(`Erro ao chamar respositorio de revistas ${error}`);
      return null;
    }
  }
  //Retorna  revistas baseada em status : mais visualizadas , utlimas revistas, ...
  async findByStatus(
    satus: string,
    views: number | undefined
  ): Promise<MagazineOutputDTO[] | null> {
    const magazines = await this.prisma?.magazines.findMany({});

    return (magazines as MagazineOutputDTO[]) || null;
  }
  //Retorna  uma revista baseada em ID
  async findID(id: number): Promise<MagazineOutputDTO | null> {
    try {
      logger.info(`[Iniciando repositorio de busca magazines]`);
      const magazines = await this.prisma?.magazines.findUnique({
        where: {
          id,
        },
        include: {
          Category: true,
          article: true,
          employees:{
            select:{
              id:true,
              name:true
            }
          },
        },
      });
      logger.info(`[Revista encontrada  ${magazines?.id}]`);
      return magazines as MagazineOutputDTO;
    } catch (error) {
      logger.error(`[Erro ao encontrar a revista ${error}]`);
      return null;
    }
  }
  async findByIDS(ids:number[]):Promise<MagazineOutputDTO[]>{
     
    try {
      const findMagazineIDs = await this.prisma?.magazines.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return findMagazineIDs as MagazineOutputDTO[] 
    } catch (error) {
      logger.info(`Erro ao buscar magazines by id`)
      throw new BadRequestError(`Error: Erro ao buscar revistas `)
    }
   

  }
  // Cria uma revista nova no sistema
  async create(input: createMagzineInputDTO): Promise<string | null> {
    logger.info(`[Iniciando respositorio de revistas `);
    try {
    
      const data = {
        author: input.author,
        company: input.company,
        cover: input.cover,
        name: input.name,
        description: input.description,
        magazine_pdf: input.magazine_pdf,
        price: input.price,
        volume: input.volume,
        model: input.model,
        slug: `${input.name}#vol${input.volume}`,
        subCategory: input.subCategory,
        categoryId: Number(input.categoryId),
      };

      const create = await this.prisma?.magazines.create({
        data: data,
      });

      const magazine = await this.conectEmployeeMagazine(
        input.employees,
        create?.id as number
      );
      logger.info(`[Revista ${create?.id} criada com sucesso  `);
      return magazine ? `Revista ${create?.id} criada com sucesso` : null;
    } catch (error) {
      logger.error(`[Erro ao criar a revista: ${error}]`);
      return null
    }
  }
  // Atualiza uma revista existente no sistema!
  async update(id: number, input: Magazine): Promise<string | null> {
   
     try {
       
      const data = {
        author: input.author,
        company: input.company,
        cover: input.cover,
        name: input.name,
        description: input.description,
        magazine_pdf: input.magazine_pdf,
        price: input.price,
        volume: input.volume,
        model: input.model,
        slug: input.slug,
        subCategory: input.subCategory,
        categoryId: Number(input.categoryId),
       }
        
         
        
      logger.info(`[Iniciando o repositorio de atualizar a revista]`);
      const updateMagazine = await prisma?.magazines.update({
        where: {
          id: Number(id),
        },
        data 
        
      });
      const magazine = await this.conectEmployeeMagazine(
        input.employees,
        updateMagazine?.id as number
      );
      logger.info(`[Revista atualizada com sucesso atualizar ${updateMagazine?.id}`);
      return  `Revista ${updateMagazine?.id} atualizada com sucesso`
     } catch (error) {
       logger.error(`[Erro ao atualizar a revista: ${error}]`);
       return null
     }
   

  }
  // Deleta uma revista existente no sistema!
  async delete(id: number): Promise<string | null> {
    
      try {
        await this.prisma?.magazines.delete({
          where:{
            id
          }
        })
        return `Revista ${id} deletada com sucesso!`
      } catch (error) {
        logger.error(`[Erro ao deletar a revista: ${error}]`);
        return null
      }
  
  }
  // Adiciona  colaboradores relacionados a uma revista exe: Colaborador Joao,Matheus,Gustavo conectado a revista ID
  async conectEmployeeMagazine(
    employee: any,
    magazineId: number
  ): Promise<boolean> {
    if (employee?.length === 0) {
      return false;
    }
    try {
      // Processa os dados
      const updatePromises = employee.map((employee: any) =>
        this.prisma?.employee.update({
          where: { id: employee.id },
          data: {
            magazines: {
              connect: { id: magazineId },
            },
          },
        })
      );

      //Adiciona os dados atualizando os colaboradores com a revista // Obs logica separada para nao criar sobrecarga na funçao
      await Promise.all(updatePromises);

      logger.info(`[Colaboradores adicionados à revista com sucesso!]`);
      return true;
    } catch (error) {
      logger.error(`[Erro ao adicionar colaboradores à revista: ${error}]`);
      return false;
    }
  }
  async removeEmployeeMagazine (magazineId:number, employeeId:number):Promise<Boolean>{

    try {
      const removeEmployee = await prisma?.magazines.update({
        where: {
          id: Number(magazineId),
        },
        data: {
            employees: {
              disconnect: {
                id: Number(employeeId),
              },
            },
          },
      });
      return true 
    } catch (error) {
      logger.error(`Erro ao remover colaborador da revista!`)
      return false
    }
    
    return true
  }
}
