import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { SchemaTypes } from 'mongoose';

import { AutoTypePopulated } from './AutoTypePopulate.decorator';
import { defaultConfig, IPropertyDecorator } from './config';

/**
 * DTO building decorator for **Ref to another document** type.
 * @constructor
 * @param {ClassConstructor<T>} dto DTO target for populated field
 * @param {IPropertyDecorator?} config Property config for define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const RefType = <T>(
  dto: ClassConstructor<T>,
  config: IPropertyDecorator = defaultConfig,
): PropertyDecorator => {
  const { defined, model, each, doc } = { ...defaultConfig, ...config };

  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      AutoTypePopulated(dto, { example: doc?.example }),
      each
        ? Prop([
            {
              type: SchemaTypes.ObjectId,
              required: model?.required,
              ref: model?.ref,
              default: model?.default,
            },
          ])
        : Prop({
            type: SchemaTypes.ObjectId,
            required: model?.required,
            ref: model?.ref,
            default: model?.default,
          }),
    ],
  );
};
