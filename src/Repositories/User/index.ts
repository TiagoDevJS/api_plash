
import prisma from "../../Frameworks/server/prisma";
import { decorators } from "tsyringe";
import { UserRepositoryInterface } from "../../Interfaces/User/UserRepositoryInterface";
import { User } from "../../Entities/user";
import { singleton } from "tsyringe/dist/decorators";
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";
import { PrismaClient } from "@prisma/client";
const { injectable} = decorators
@singleton()
export class UserRepository implements UserRepositoryInterface  {
  prisma = prisma;

  constructor() {
    this.prisma = prisma 
  }
  async create(input: User): Promise<string | null> {
    try {
      const data = {
        name:input.name,
        lastName:input.lastName,
        email:input.email,
        password:input.password,
        city:input.city,
        cep:input.cep,
        district:input.district,
        adress:input.adress,
        numberAdress:input.numberAdress,
        complement:input.complement,
        avatar:input.avatar,
        library:{
          create:{
            name: `Biblioteca de ${input.name} ${input.lastName} `
          }
        }
        
  
      }
      const create = await this.prisma?.users.create({
        data
         
        
      })
     
      return `Usuario ${create?.name} criado com sucesso !`
    } catch (error) {
      logger.error(`Erro ao criar o usuario : ${error}`)
      throw new BadRequestError(`Erro ao criar o usuario.`)
    }
    
  }
 async findAll(): Promise<User[]> {
    try {
       const users = await this.prisma?.users.findMany({})
       return users as User[]
    } catch (error) {
       logger.error(`Erro ao buscar lista de usuarios `)
       throw  new BadRequestError(`Erro ao buscar usuarios `)
    }
 }
  async findID(id: number): Promise<Partial<User> | null> {
    try {
      const user = await this.prisma?.users.findUnique({
        where:{
          id
        },
       select:{
        id:true,
        adress:true,
        avatar:true,
        city:true,
        complement:true,
        email:true,
        lastName:true,
        numberAdress:true,
        cep:true,
        district:true,
        availableForWithdrawal:true,
        library:{
          select:{
            magazinesRef:true,
            id:true,
            name:true,
            userId:true,
          }
        },
       dvlClient:true

       

       },
       
       })
       return user as User | null 
    } catch (error) {
      logger.error(`Erro ao buscar usuario : ${error}`)
      throw new BadRequestError(`Erro ao buscar usuario `)
    }
     
  }
  async updateManyUsersAvaibleWithDraw(ids:number[],receive:number){
    console.log(receive)
    try {
      const usersToUpdate = await this.prisma?.users.findMany({
        where: {
          dvlClient: {
            some: {
              id: {
                in: ids,
              },
            },
          },
          
        },
        select:{
          id:true,
          availableForWithdrawal:true
        }
        
      });
  
    
      // 5. Atualizando o saldo disponível para saque dos usuários
  
      const usersUpdate = usersToUpdate?.map(async (user) => {
        return this.prisma?.users.update({
          where: {
            id: user.id,
          },
          data: {
            availableForWithdrawal:receive
             
          }
        });
      });
         
      
      await Promise.all([usersUpdate])
      return `Ok `
    } catch (error) {
      console.log(error)
    }
   
  
  }
  
}
