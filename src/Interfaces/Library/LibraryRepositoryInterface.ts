import { LibraryInputDTO } from "../../DTO/Library/inputDTO";


export interface LibraryRepositoryInterace {
    create(data:LibraryInputDTO):Promise<string | null>
}