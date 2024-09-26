import { UserInputDto } from "../DTO/User/userDTO";
import { bcryptService } from "../Frameworks/service/bcryptService";

export class User {
  public readonly id!:number;
  public readonly name!: string;
  public readonly lastName!:string;
  public readonly password!:string;
  public readonly email!:string;
  public readonly cep!:string;
  public readonly city!:string;
  public readonly district!:string;
  public readonly adress!:string;
  public readonly numberAdress!:string;
  public readonly complement!:string;
  public readonly avatar!:string;
  public readonly library?:[{id:number}]
  constructor(props: UserInputDto,hashPassword:string) {
    Object.assign(this, props);
    this.password = hashPassword

  }

  static async  create(props:UserInputDto, ):Promise<User>{
    const hashPassword = await  bcryptService.hashPassword(props.password)
    return new User(props, hashPassword)
  }
}
