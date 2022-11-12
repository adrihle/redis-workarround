import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export const MongoId = (): PropertyDecorator => {
  return applyDecorators(
    ...[IsMongoId(), Transform(({ key, obj }) => String(obj[key]))],
  );
};
