import { createEmployeeDTO } from "../DTO/Employees/inputDTO";
import { bcryptService } from "../Frameworks/service/bcryptService";

export class Employee {
  name: string;
  email: string;
  password: string;
  profession: string;
  phone: string;
  commission: number;
  avatar: any;
  private constructor(props: createEmployeeDTO,hashPassword:string) {
    // Mapeando os valores diretamente
    (this.name = props.name),
    (this.email = props.email),
    (this.password = hashPassword),
    (this.profession = props.profession),
    (this.phone = props.phone),
    (this.commission = props.commission),
    (this.avatar = props.avatar);
  
  }

  // Método estático para criar uma instância da revista
  static async  create(props: createEmployeeDTO): Promise<Employee> {
    const hashedPassword = await bcryptService.hashPassword(props.password);
    return new Employee(props,hashedPassword);
  }

  // Getters para acessar as propriedades da revista

  get Email(): string {
    return this.email;
  }

  get Name(): string {
    return this.name;
  }

  get Commission(): number {
    return this.commission;
  }

  get Pass(): string {
    return this.password;
  }
  get Phone(): string {
    return this.phone;
  }
  get Avatar(): string | null {
    return this?.avatar 
  }
  async hashPassword(): Promise<string> {
    const hash = await bcryptService.hashPassword(this.password);

    return hash;
  }
}
