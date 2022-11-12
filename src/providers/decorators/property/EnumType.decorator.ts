import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';

import { defaultConfig, IPropertyDecorator } from './config';

/**
 * DTO building decorator for **Enum** type.
 * @constructor
 * @param {Record<any, any>} e Enum for validate
 * @param {IPropertyDecorator?} config Property config for define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const EnumType = (
  e: Record<any, any>,
  config: IPropertyDecorator = defaultConfig,
): PropertyDecorator => {
  const { defined, doc, model, each } = { ...defaultConfig, ...config };
  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      IsEnum(e, { each: true }),
      ApiProperty({
        type: each ? [String] : String,
        enum: e,
        example: doc?.example,
      }),
      each
        ? Prop([
            {
              type: String,
              enum: e,
              required: model?.required,
            },
          ])
        : Prop({
            type: String,
            enum: e,
            required: model?.required,
          }),
    ],
  );
};
