import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Redirect,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

import { ApiErrorResponse, ErrorDto } from './ApiErrorResponse.decorator';
import { IsPublicEndpoint } from './IsPublicEndpoint.decorator';

const verbs = {
  GET: Get,
  POST: Post,
  PUT: Put,
  DELETE: Delete,
};

interface EndpointOptions {
  verb?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path?: string | string[];
  code?: HttpStatus;
  isPublic?: boolean;
  isPublicWithAuth?: boolean;
  okResponse?: ApiResponseOptions;
  errorResponse?: ErrorDto | ErrorDto[];
  redirect?:
    | boolean
    | { url: string; code?: HttpStatus.PERMANENT_REDIRECT | HttpStatus.FOUND };
  validation?: {
    whitelist?: boolean;
    transform?: boolean;
    forbidNonWhitelisted?: boolean;
  };
}

export const Endpoint = (options: EndpointOptions = {}): PropertyDecorator => {
  const decorators: Array<
    PropertyDecorator | ClassDecorator | MethodDecorator
  > = [];
  const verb = options.verb || 'GET';

  decorators.push(verbs[verb](options.path));

  if (options.code) {
    decorators.push(HttpCode(options.code));
  }

  if (options.isPublic || options.isPublicWithAuth) {
    decorators.push(IsPublicEndpoint());
  } else {
    decorators.push(ApiBearerAuth());
  }

  if (options.okResponse) {
    decorators.push(ApiOkResponse(options.okResponse));
    decorators.push(HttpCode(options.okResponse.status as number));
  }

  if (options.errorResponse) {
    const args = Array.isArray(options.errorResponse)
      ? options.errorResponse
      : [options.errorResponse];
    decorators.push(ApiErrorResponse(...args));
  }

  if (options.redirect) {
    if (typeof options.redirect === 'boolean') {
      decorators.push(Redirect());
    } else {
      decorators.push(
        Redirect(
          options.redirect.url,
          options.redirect.code || HttpStatus.FOUND,
        ),
      );
    }
  }

  const validationOptions = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  };

  if (options.validation) {
    Object.assign(validationOptions, options.validation);
  }

  decorators.push(UsePipes(new ValidationPipe(validationOptions)));

  return applyDecorators(...decorators);
};
