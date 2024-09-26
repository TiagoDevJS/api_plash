import { Admin } from "../../Entities/admin";
import { HttpResponse } from "../../Frameworks/Controllers/Helpers/protocolos";

export interface AdminControllerInterface {
    create(input:Admin):Promise<HttpResponse<unknown>>
    authenticated(token:string):Promise<void>
}