import {
  isNotEmptyObject,
  validateSync,
  ValidationError,
} from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { HttpException, BadRequestException } from '@nestjs/common';

type Errors<T> = Record<keyof T, string[]>;

const getServerError = <T>(errors: Errors<T>) => {
  const badRequest = new BadRequestException();
  const serverError = new HttpException(
    {
      statusCode: badRequest.getStatus(),
      message: Object.values(errors).flat(),
      error: badRequest.message,
    },
    badRequest.getStatus(),
  );
  return serverError;
};

const getErrorsConstraint = <T>(errors: ValidationError[]) =>
  errors.reduce((acc, { constraints, property }) => {
    const errorList = Object.entries(constraints).map(([, value]) => value);
    if (!errorList.length) return acc;
    return {
      ...acc,
      [property]: errorList,
    };
  }, {} as Errors<T>);

const validateRequestObject = <T>(Dto: ClassConstructor<T>, obj: unknown) => {
  const classInstanced = plainToInstance(Dto, obj);
  const validation = validateSync(classInstanced as object);
  const errors = getErrorsConstraint<T>(validation);
  if (isNotEmptyObject(errors)) throw getServerError<T>(errors);
};

export { validateRequestObject };
