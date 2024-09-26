import { SponsorsInputDTO } from "../DTO/Sponsors/inputDTO";

export class Sponsors {
  email: string;
  company: string;
  name: string;
  cover: string;
  url: string;
  phone:string

  private constructor(props: SponsorsInputDTO) {
    // Mapeando os valores diretamente

    this.company = props.company;
    this.name = props.name;
     this.phone = props.phone
    this.cover = props.cover;
    this.url = props.url;

    this.email = props.email;
  }

  // Método estático para criar uma instância da revista
  static create(props: SponsorsInputDTO): Sponsors {
    return new Sponsors(props);
  }

  

  // Getters para acessar as propriedades da revista
  get Url(): string {
    return this.url;
  }

  get Company(): string {
    return this.company;
  }

  get Name(): string {
    return this.name;
  }

  get Email(): string {
    return this.email;
  }

  get Cover(): string {
    return this.cover;
  }
  get Phone(): string {
    return this.phone;
  }
}
