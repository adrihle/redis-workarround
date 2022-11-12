import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ErrorDto {
  @ApiProperty({ type: Number, example: 404 })
  status: number;

  @IsString()
  @ApiProperty({ type: String, example: 'Error message' })
  message: string;
}

export const ApiErrorResponse = (
  ...errorResponses: ErrorDto[]
): MethodDecorator => {
  if (
    !errorResponses.find(
      ({ status }) => status === HttpStatus.INTERNAL_SERVER_ERROR,
    )
  ) {
    errorResponses.push({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal error',
    });
  }

  return applyDecorators(
    ...errorResponses.map(({ status, message }) =>
      ApiResponse({ status, type: ErrorDto, description: message }),
    ),
  );
};
