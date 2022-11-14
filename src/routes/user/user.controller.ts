import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const BASE_ROUTE = 'user';
@ApiTags(BASE_ROUTE)
@Controller(BASE_ROUTE)
export class UserController {}
