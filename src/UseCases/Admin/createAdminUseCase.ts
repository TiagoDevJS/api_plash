import { inject, injectable } from "tsyringe/dist/decorators";
import { Admin } from "../../Entities/admin";
import { CreateUseruseCaseInterface } from "../../Interfaces/Admin/createAdminUseCaseInterface";
import { AdminRepository } from "../../Repositories/Admin";
import  {OTPLibProvider} from "../../Providers/Otp"
import logger from "../../adapters/winstomLogger";
import { BadRequestError } from "../../handleError/errors";
import { GenerateQrcode } from "../../Providers/Qrcode";
@injectable()
export class AdminCreateUseCase  implements CreateUseruseCaseInterface{
    private otpProvider : OTPLibProvider
    private generateQrcode:GenerateQrcode
     constructor(
        //@ts-ignore
        @inject(AdminRepository)
        private readonly adminRepo:AdminRepository
         
     ){
    this.otpProvider = new OTPLibProvider()
    this.generateQrcode = new GenerateQrcode()
     }
    async execute(input: Admin): Promise<string | null> {
        try {
             // Cria a instancia  do Admin e gera o hash criptografado da senha 
        const data =   await  Admin.create(input)
        // Cria o secret da autenticaçao em 2 fatores 
        const secret = await this.otpProvider.generateBase32Key()
        // Envia os dados para criaçao do admin
        const create = await this.adminRepo.create(data, secret)
        if(!create){
            logger.error(`Erro ao criar o admin`)
            throw new BadRequestError(`Erro ao criar adminstrador!`)
        }
         this.generateQrcode.createUrlQrcode(create.name,secret)
        return `http://localhost:443/tmp/${create?.name}`

        } catch (error) {
            logger.error(`Erro ao criar o admisntrador`)
            throw new BadRequestError(`Erro ao criar o adminstrador. Tente novamente mais tarde!`)
        }
       
       throw'' 
    }
}