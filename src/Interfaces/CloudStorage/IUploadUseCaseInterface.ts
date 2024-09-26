export interface IUploadUseCaseInterface{
    publicUploadUrlFile(file:string):Promise<string | null>
    privateUploadUrlFile(file:any):Promise<string | null>
}