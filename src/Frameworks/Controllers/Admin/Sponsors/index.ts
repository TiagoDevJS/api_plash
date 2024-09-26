import { container } from "tsyringe";
import { HttpResponse } from "../../Helpers/protocolos";
import { ok } from "../../Helpers/helperError";
import { ValidatorCustom } from "../../../../utils/validatorZodSchema";
import { SponsorsControllerInterface } from "../../../../Interfaces/Sponsors/SponsorsControllerInterface";
import { SponsorUseCaseCreate } from "../../../../UseCases/Sponsors/createSponsorsUseCase";
import { Sponsors } from "../../../../Entities/sponsors";
import { sponsorsSchema } from "../../../../schemas/sponsorsValidation";
import { SponsorsUseCaseUpdate } from "../../../../UseCases/Sponsors/updateSponsorsUseCase";
import { SponsorsUseCaseDelete } from "../../../../UseCases/Sponsors/deleteSponsorsUseCase";
import { SponsorsUseCaseGet } from "../../../../UseCases/Sponsors/getSponsorosUseCase";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";

export class SponsorsController implements SponsorsControllerInterface {
  private createSponsorUseCase: SponsorUseCaseCreate;
  private updateSponsorUseCase: SponsorsUseCaseUpdate;
  private deleteSponsorUseCase: SponsorsUseCaseDelete;
  private getSponsorsUseCase: SponsorsUseCaseGet;
  constructor() {
    this.createSponsorUseCase = container.resolve(SponsorUseCaseCreate);
    this.updateSponsorUseCase = container.resolve(SponsorsUseCaseUpdate);
    this.deleteSponsorUseCase = container.resolve(SponsorsUseCaseDelete);
    this.getSponsorsUseCase = container.resolve(SponsorsUseCaseGet);
  }

  async create(input: Sponsors): Promise<HttpResponse<unknown>> {
    try {
      const validationError = ValidatorCustom.validate(sponsorsSchema, input);
      
      const data = await this.createSponsorUseCase.execute(validationError);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async update(id: number, input: Sponsors): Promise<HttpResponse<unknown>> {
    try {
      const validationError = ValidatorCustom.validate(sponsorsSchema, input);

      const data = await this.updateSponsorUseCase.execute(id, validationError);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async delete(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.deleteSponsorUseCase.execute(id);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }

  async getAllSponsors(): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getSponsorsUseCase.findAll();
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async getIDSponsors(id: number): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.getSponsorsUseCase.findID(id);
      return ok(data);
    } catch (error: unknown) {
      return handleErrorResponse(error as any);
    }
  }
}
