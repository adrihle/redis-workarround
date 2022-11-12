import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

import { defaultConfig, IPropertyDecorator } from './config';

interface INumberType extends IPropertyDecorator {
  min?: number;
  max?: number;
}

const numberDecoratorRelationship: Record<
  IPropertyDecorator['numberType'],
  PropertyDecorator
> = {
  generic: IsNumber(),
  int: IsInt(),
};

const defaultNumberConfig: INumberType = {
  ...defaultConfig,
};

/**
 * DTO building decorator for **Number** type.
 * @constructor
 * @param {INumberType?} config Property config for number type, define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const NumberType = (
  config: INumberType = defaultNumberConfig,
): PropertyDecorator => {
  const { defined, doc, model, each, numberType, min, max } = {
    ...defaultConfig,
    ...config,
  };

  const decorators: PropertyDecorator[] = [
    defined ? IsDefined() : IsOptional(),
    numberDecoratorRelationship[numberType],
    ApiProperty({ type: Number, example: doc?.example }),
    each
      ? Prop([
          {
            type: Number,
            required: model?.required,
          },
        ])
      : Prop({
          type: Number,
          required: model?.required,
        }),
  ];

  if (min) decorators.push(Min(min));
  if (max) decorators.push(Max(max));

  return applyDecorators(...decorators);
};
