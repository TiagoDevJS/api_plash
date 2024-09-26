import { UploadUseCase } from "../../../../UseCases/Upload";
import { inject } from "tsyringe/dist/decorators";
import { HttpResponse } from "../../Helpers/protocolos";
import { notFound, ok, serverError } from "../../Helpers/helperError";
import { container } from "tsyringe";
import { File } from "@google-cloud/storage";

export class UploadController {
  private uploadUseCase: UploadUseCase;
  constructor() {
    this.uploadUseCase = container.resolve(UploadUseCase);
  }

  async createPublicUrl(file: any): Promise<HttpResponse<unknown>> {
    try {
      const url = await this.uploadUseCase.publicUploadUrlFile(file);
      if (!url) {
        return notFound("Erro a gerar url ");
      }
      return ok(url);
    } catch (error) {
      console.log(error)
      return serverError();
    }
  }
  async createPrivateUrl(file: any): Promise<HttpResponse<unknown>> {
    try {
      const url = await this.uploadUseCase.privateUploadUrlFile(file);
      if (!url) {
        return notFound("Erro a gerar url ");
      }
      return ok(url);
    } catch (error) {
      console.log(error)
      return serverError();
    }
  }
}
