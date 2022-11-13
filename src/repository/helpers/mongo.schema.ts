import { ApiProperty } from '@nestjs/swagger';

export class MongoSchema {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: Date })
  created_at: string;

  @ApiProperty({ type: Date })
  updated_at: string;
}
