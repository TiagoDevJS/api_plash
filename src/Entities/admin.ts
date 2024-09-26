import { AdminIputDTO } from "../DTO/Admin/inputDTO"
import { bcryptService } from "../Frameworks/service/bcryptService"

export class Admin {
  
    name:string
    email:string
    password:string
    avatar:string
    role:string
    constructor(props:AdminIputDTO, hashPassword:string){
        this.name = props.name,
        this.email = props.email,
        this.password = hashPassword,
        this.role = props.role,
        this.avatar = props.avatar
    }
    static async  create(props:AdminIputDTO):Promise<Admin>{
         const hashPassword = await  bcryptService.hashPassword(props.password)
      return new Admin (props,hashPassword)
    }
    
}