import { createMagzineInputDTO } from "../../DTO/Magazines/inputDTO";
import { Magazine } from "../../Entities/magazine";

export interface CreateMagazineInterface {
     create(input:createMagzineInputDTO):Promise<string| null>
}