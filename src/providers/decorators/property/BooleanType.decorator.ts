import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsOptional } from 'class-validator';

import { defaultConfig, IPropertyDecorator } from './config';

/**
 * DTO building decorator for **Boolean** type.
 * @constructor
 * @param {IPropertyDecorator?} config Property config for define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const BooleanType = (
  config: IPropertyDecorator = defaultConfig,
): PropertyDecorator => {
  const { defined, doc, model, each } = { ...defaultConfig, ...config };
  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      IsBoolean({ each }),
      ApiProperty({ type: each ? [Boolean] : Boolean, example: doc?.example }),
      each
        ? Prop([
            {
              type: Boolean,
              required: model?.required,
            },
          ])
        : Prop({
            type: Boolean,
            required: model?.required,
            default: model?.default,
          }),
    ],
  );
};
