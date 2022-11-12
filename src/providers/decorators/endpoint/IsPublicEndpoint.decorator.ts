import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ENDPOINT = 'IS_PUBLIC_ENDPOINT';
export const IsPublicEndpoint = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_ENDPOINT, true);
