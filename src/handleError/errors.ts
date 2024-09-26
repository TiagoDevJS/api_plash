 // Classe NotFound status code 404
export class NotFoundError extends Error {
    constructor(message = "Resource not found") {
      super(message);
      this.name = "NotFoundError"; // Define o nome para identificar no middleware
    }
  }
  
  // Classe responsavel por exibir os erros de validaçao status code 404
  export class ValidationError extends Error {
    public errors: { path: string; message: string }[];
  
    constructor(errors: { path: string; message: string }[], message = 'Validation Error') {
      super(message);
      this.name = "ValidationError";
      this.errors = errors;
    }
  }
  
  // Classe BadRequest status code 400
  export class BadRequestError extends Error {
    constructor(message = "Bad request") {
      super(message);
      this.name = "BadRequestError";
    }
  }
   // Classe Conflict status code 409
  export class Conflict extends Error {
    constructor(message = "Conflict") {
      super(message);
      this.name = "ConflictError";
    }
  }