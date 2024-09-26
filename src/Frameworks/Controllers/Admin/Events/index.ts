import { container } from "tsyringe";
import { EventsControllerInterface } from "../../../../Interfaces/Events/EventsControllerIntreface";
import { EventsCreateUseCase } from "../../../../UseCases/Events/createEventUseCase";
import { HttpResponse } from "../../Helpers/protocolos";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { eventsSchema, sponsorSchemaEvent, sponsorSchemaEventID } from "../../../../schemas/eventSchema";
import { ok } from "../../Helpers/helperError";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
import { EventsUpdateUseCase } from "../../../../UseCases/Events/updateEventUseCase";
import { EventsInputDTO } from "../../../../DTO/Events/inputDTO";
import { EventsGetUseCase } from "../../../../UseCases/Events/getEventUseCase";
import { EventsDeleteUseCase } from "../../../../UseCases/Events/deleteEventsUseCase";
import { DeleteSponsorEventsUseCase } from "../../../../UseCases/Events/deleteSponsorByEvents";


export class EventsController implements EventsControllerInterface {
  private createEventUseCase: EventsCreateUseCase;
  private updateUseCase: EventsUpdateUseCase;
  private getUseCase: EventsGetUseCase;
  private deleteUseCase: EventsDeleteUseCase
  private removeSponsorEventUseCase:DeleteSponsorEventsUseCase
  constructor() {
    this.createEventUseCase = container.resolve(EventsCreateUseCase);
    this.updateUseCase = container.resolve(EventsUpdateUseCase);
    this.getUseCase = container.resolve(EventsGetUseCase)
    this.deleteUseCase = container.resolve(EventsDeleteUseCase)
    this.removeSponsorEventUseCase = container.resolve(DeleteSponsorEventsUseCase)

  }
  async create(input: EventsInputDTO): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(eventsSchema, input);
      const data = await this.createEventUseCase.execute(result);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async update(
    id: number,
    input: EventsInputDTO
  ): Promise<HttpResponse<unknown>> {
    try {
      const result = ValidatorCustom.validate(eventsSchema, input);
      const data = await this.updateUseCase.execute(id, result);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }

  async delete(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.deleteUseCase.execute(id);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async findAll(query:any): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getUseCase.findAll(query);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async findID(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getUseCase.findID(id);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async removeSponsorByEvents(eventID: number, sponsorID: number): Promise<HttpResponse<unknown>> {
    try {
   
  
      const idSponsor = ValidatorCustom.validate(sponsorSchemaEventID, sponsorID)
      const data = await this.removeSponsorEventUseCase.execute(eventID,idSponsor);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
}
