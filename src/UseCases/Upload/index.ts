import { inject, singleton } from "tsyringe/dist/decorators";
import { IUploadUseCaseInterface } from "../../Interfaces/CloudStorage/IUploadUseCaseInterface";
import { CloudStorageReposytori } from "../../Repositories/CloudStorage";

@singleton()
export class UploadUseCase implements IUploadUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(CloudStorageReposytori)
    private readonly uploadRepository: CloudStorageReposytori
  ){

  }
  async publicUploadUrlFile(file: any): Promise<string | null> {
      const url = this.uploadRepository.publicUploadUrl(file)
      return url
  }
  async privateUploadUrlFile(file: any): Promise<string | null> {
    const url = this.uploadRepository.privateUploadUrl(file)
    return url
}
  
}