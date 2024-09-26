import { HttpResponse,HttpStatusCode } from "./protocolos";
//Helpers Status code
export const ok = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.OK,
    body,
  });
  export const notFound = (notFoundText:string): HttpResponse<string> => ({
    statusCode: HttpStatusCode.NOT_FOUND,
    body:notFoundText
  });
  export const errorInput = (body:any): HttpResponse<string> => ({
    statusCode: HttpStatusCode.NOT_FOUND,
    body:body
  });
  export const BadRequest = (badRequestText:string): HttpResponse<string> => ({
    statusCode: HttpStatusCode.BAD_REQUEST,
    body:badRequestText
  });
export const serverError =  ():HttpResponse<string>=>{
  return{
    statusCode:HttpStatusCode.SERVER_ERROR,
    body:'Erro interno no servidor '
  }
 

}
export const conflictError =  (text:string):HttpResponse<string>=>{
  return{
    statusCode:HttpStatusCode.CONFLICT_ERROR,
    body:text
  }
}