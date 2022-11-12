import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoIdValidation implements PipeTransform<string> {
  transform(value: string): string {
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) {
        return value;
      }
      throw new BadRequestException('Param id must be a valid ObjectId');
    }
    throw new BadRequestException('Param id must be a valid ObjectId');
  }
}
