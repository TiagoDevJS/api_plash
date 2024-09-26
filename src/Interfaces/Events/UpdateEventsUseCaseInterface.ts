import { EventsInputDTO } from "../../DTO/Events/inputDTO";

export interface UpdateEventsUseCaseInterface {
    execute(id:number, input:EventsInputDTO):Promise<string | null>
}