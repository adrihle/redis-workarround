import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsOptional } from 'class-validator';

import { defaultConfig, IPropertyDecorator } from './config';

/**
 * DTO building decorator for **MongoId** type.
 * @constructor
 * @param {IPropertyDecorator?} config Property config for define
 * validation, documentation and model property definition
 * @version 1.00
 */

export const MongoIdType = (
  config: IPropertyDecorator = defaultConfig,
): PropertyDecorator => {
  const { defined, doc } = { ...defaultConfig, ...config };
  return applyDecorators(
    ...[
      defined ? IsDefined() : IsOptional(),
      IsMongoId(),
      ApiProperty({ type: String, example: doc?.example }),
    ],
  );
};
