import {
  notFound,
  errorInput,
  serverError,
  BadRequest,
  conflictError,
} from "../Frameworks/Controllers/Helpers/helperError";
import { HttpResponse } from "../Frameworks/Controllers/Helpers/protocolos";
import {
  BadRequestError,
  Conflict,
  NotFoundError,
  ValidationError,
} from "./errors";

export function handleErrorResponse(error: Error): HttpResponse<unknown> {
  switch (true) {
    case error instanceof ValidationError:
      return errorInput(error);

    case error instanceof NotFoundError:
      return notFound(error.message);

    case error instanceof BadRequestError:
      return BadRequest(error.message);
    case error instanceof Conflict:
      return conflictError(error.message);
    default:
      return serverError();
  }
}
