import { Controller } from '@nestjs/common';

export const BASE_ROUTE = 'route1';

@Controller(BASE_ROUTE)
export class Route1Controller {}
