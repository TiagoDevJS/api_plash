import { z, ZodSchema, ZodError } from "zod";

import { ValidationError } from "../handleError/errors";

type ValidationSuccess<T> = {
  success: true;
  data: T;
};

// Tipo para o resultado de erro da validação
type ValidationFailure = {
  success: false;
  errors: Array<{ path: string; message: string }>;
};

// Tipo de resultado da validação
type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;
export class ValidatorCustom {
  static validate(schema: ZodSchema, props: any): any {
    const result = schema.safeParse(props);
    if (result.error) {
      const errorMessages = result.error?.errors.map((error: any) => ({
        path: error.path.join("."),
        message: error.message,
      }));
       console.log(errorMessages)
      const text = JSON.stringify(errorMessages)
      throw new ValidationError(errorMessages)
    }

    return result.data;
  }
}
