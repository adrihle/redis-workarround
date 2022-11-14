import { Delete, Get, Post, Put, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ApiErrorResponse, ErrorResponse } from './ApiErrorResponse.decorator';

type Verb = 'GET' | 'POST' | 'PUT' | 'DEL';

const VERBS: Record<Verb, typeof Get> = {
  GET: Get,
  POST: Post,
  PUT: Put,
  DEL: Delete,
};

type EndpointConfig = {
  path?: string;
  verb?: Verb;
  okResponse?: ApiResponseOptions;
  errorResponse?: ErrorResponse[];
};

const Endpoint = (config: EndpointConfig): MethodDecorator => {
  const { verb = 'GET', okResponse, errorResponse = [], path } = config;
  return applyDecorators(
    VERBS[verb](path),
    ApiOkResponse(okResponse),
    ApiErrorResponse(errorResponse),
  );
};

export { Endpoint };
