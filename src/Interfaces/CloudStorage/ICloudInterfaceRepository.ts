import { File } from "@google-cloud/storage"

export interface ICloudStorageInterface {
    generateFilePublicUrl(file:File):Promise<string | null>
    privateUploadUrl(file:File):Promise<string | null>
    publicUploadUrl(file:File):Promise<string | null>

}