import { MagazineOutputDTO } from "../Magazines/outputDTO"

export type LibraryInputDTO = {
    id:number,
    magazines:MagazineOutputDTO[]
}