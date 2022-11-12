import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsIBAN,
  IsIdentityCard,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { defaultConfig, IPropertyDecorator } from './config';

const stringDecoratorRelationship: Record<
  IPropertyDecorator['stringType'],
  PropertyDecorator
> = {
  generic: IsString(),
  email: IsEmail(),
  date: IsDateString(),
  url: IsUrl(),
  iban: IsIBAN(),
  'identity-card': IsIdentityCard('any'),
  number: IsNumberString(),
};

/**
 * DTO building decorator for **String** type.
 * @constructor
 * @param {IPropertyDecorator?} config Property config for string type, define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const StringType = (
  config: IPropertyDecorator = defaultConfig,
): PropertyDecorator => {
  const { defined, stringType, doc, model } = { ...defaultConfig, ...config };
  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      stringDecoratorRelationship[stringType],
      ApiProperty({ type: String, example: doc?.example }),
      Prop({
        type: String,
        required: model?.required,
        trim: model?.trim,
        unique: model?.unique,
      }),
    ],
  );
};
