import { Admin } from "../../Entities/admin";
import { AdminRepositoryInterface } from "../../Interfaces/Admin/AdminRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import logger from "../../adapters/winstomLogger";
import { singleton } from "tsyringe/dist/decorators";
@singleton()
export class AdminRepository implements AdminRepositoryInterface{
    private prisma = prisma
    constructor(){
        this.prisma = prisma
    }
    async create(input: Admin, secret: string): Promise<Admin | null> {
        try {
            const data = {
                email:input.email,
                name:input.name,
                password:input.password,
                role:"ADMIN",
                avatar:input.avatar,
                twoFactorAuth:{
                    create:{
                        name:input.name,
                        secret:secret,
                        
                    }
                }
            }
            const admin =  await this.prisma?.admin.create({
                data
             })
             logger.info(`Admin criado com sucesso`)
             return admin as Admin
        } catch (error) {
            logger.info(`Erro ao criar admin! ${error}`)
            return null 
        }
       
    }
   async  findByEmail(email: string): Promise<Admin | null> {
        throw ''
    }
}