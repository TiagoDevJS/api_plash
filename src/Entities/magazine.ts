import { createMagzineInputDTO } from "../DTO/Magazines/inputDTO";
import { MagazineOutputDTO } from "../DTO/Magazines/outputDTO";

export type employeesType = {
  id:number,
  name:string
}
export class Magazine {
   author: string;
   company: string;
   name: string;
   description: string;
   cover: string;
   volume: string;
   slug: string;
   magazine_pdf: string;
   categoryId: number;
   price: number;
   subCategory: string;
   model: string;
   employees?: employeesType[] | undefined;

   private constructor(props: createMagzineInputDTO) {
    // Mapeando os valores diretamente
    this.author = props.author;
    this.company = props.company;
    this.name = props.name;
    this.description = props.description;
    this.cover = props.cover;
    this.volume = props.volume;
    this.slug = `${props.name}#vol${props.volume}`;
    this.magazine_pdf = props.magazine_pdf;
    this.categoryId = props.categoryId;
    this.price = props.price;
    this.subCategory = props.subCategory;
    this.model = props.model;
    this.employees = props.employees; 
  }

  // Método estático para criar uma instância da revista
  static create(props: createMagzineInputDTO): Magazine {
    return new Magazine(props);
  }

  // Método para retornar dados públicos da revista
  static publicDataMagazine(props: MagazineOutputDTO): Partial<MagazineOutputDTO | null> {
    
    return {
      name: props.name,
      author: props.author,
      company: props.company,
      description: props.description,
      cover: props.cover,
      volume: props.volume,
      slug: props.slug,
      price:props.price,
      views:props.views,
      model:props.model
    };
  }
static filterMagazaninesByID(ids:number[],magazines:MagazineOutputDTO[]){
  const filter =  magazines.filter((items)=> ids.includes(items.id))
  
  return filter
}
  // Getters para acessar as propriedades da revista
  getAuthor(): string {
    return this.author;
  }


  getCompany(): string {
    return this.company;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCover(): string {
    return this.cover;
  }

  getVolume(): string {
    return this.volume;
  }

  getSlug(): string {
    return this.slug;
  }

  getMagazinePdf(): string {
    return this.magazine_pdf;
  }

  getCategoryId(): number {
    return this.categoryId;
  }

  getPrice(): number {
    return this.price;
  }

  getSubCategory(): string {
    return this.subCategory;
  }

  getModel(): string {
    return this.model;
  }
 
}
