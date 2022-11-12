import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';

import { defaultConfig } from './config';

/**
 * DTO building decorator for **DTO** type.
 * @constructor
 * @param {ClassConstructor<T>} dto DTO for validate
 * @param {IPropertyDecorator?} config Property config for define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const DtoType = <T>(
  dto: ClassConstructor<T>,
  config = defaultConfig,
): PropertyDecorator => {
  const { defined, doc, model, each } = { ...defaultConfig, ...config };
  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      Type(() => dto),
      ValidateNested(),
      ApiProperty({ type: each ? [dto] : dto, example: doc?.example }),
      each
        ? Prop([
            {
              type: dto,
              required: model?.required,
            },
          ])
        : Prop({
            type: dto,
            required: model?.required,
          }),
    ],
  );
};
