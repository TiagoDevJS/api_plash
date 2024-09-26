import { EventsInputDTO } from "../../DTO/Events/inputDTO";

export interface CretateEventsUseCaseInterface {
    execute(input:EventsInputDTO):Promise<string | null>
}