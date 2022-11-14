import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ type: String, example: 'Error info' })
  message: string;
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.BAD_REQUEST })
  status: HttpStatus;
}

export const ApiErrorResponse = (errors: ErrorResponse[]): MethodDecorator => {
  const isInternalServerIncluded = errors.some(
    ({ status }) => status === HttpStatus.INTERNAL_SERVER_ERROR,
  );
  const decorators = errors.map(({ message, status }) =>
    ApiResponse({ status, type: ErrorResponse, description: message }),
  );
  if (!isInternalServerIncluded) {
    decorators.push(
      ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        type: ErrorResponse,
        description: 'Internal server error',
      }),
    );
  }
  return applyDecorators(...decorators);
};
