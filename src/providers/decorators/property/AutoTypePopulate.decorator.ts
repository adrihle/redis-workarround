import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, Type, TypeHelpOptions } from 'class-transformer';
import { isArray, isMongoId, ValidateNested } from 'class-validator';

const getType = <T>(
  DTO: ClassConstructor<T>,
  { object, property }: TypeHelpOptions,
): ClassConstructor<T> | StringConstructor => {
  let value = object[property];

  if (isArray(value)) {
    value = value[0];
  }

  if (isMongoId(String(value))) {
    return String;
  }

  return DTO;
};

export const AutoTypePopulated = <T>(
  DTO: ClassConstructor<T>,
  config?: { example: unknown },
): PropertyDecorator => {
  let type: ClassConstructor<T> | StringConstructor;
  return applyDecorators(
    ...[
      Type((helper) => {
        type = getType(DTO, helper);
        return type;
      }),
      ValidateNested(),
      ApiProperty({ type, example: config?.example }),
    ],
  );
};
