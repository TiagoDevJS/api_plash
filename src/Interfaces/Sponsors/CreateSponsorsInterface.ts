import { SponsorsInputDTO } from "../../DTO/Sponsors/inputDTO";

export interface CreateSponsorsInterface {
    execute(input:SponsorsInputDTO):Promise <string | null>
}