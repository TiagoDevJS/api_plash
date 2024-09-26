import { LibraryInputDTO } from "../DTO/Library/inputDTO";
import { MagazineOutputDTO } from "../DTO/Magazines/outputDTO";

export class Library {
  public readonly id!: number;
  public readonly magazines!: MagazineOutputDTO[];
  constructor(id:number, magazines:MagazineOutputDTO[]) {
    this.id = id,
    this.magazines = magazines
  }
  static create(id:number, magazines:MagazineOutputDTO[]): Library {
    return new Library(id, magazines );
  }
}
