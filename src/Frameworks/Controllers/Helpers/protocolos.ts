export interface HttpResponse<T> {
    statusCode:number
    body:T
  }
  //Enum httpsatuscode
  export enum HttpStatusCode {
      OK = 200,
      CREATED = 201,
      BAD_REQUEST = 400,
      NOT_FOUND = 404,
      SERVER_ERROR = 500,
      CONFLICT_ERROR = 409,
      
    }
    //Type req express
    export interface HttpRequest {
      slug?: any;
      
    }