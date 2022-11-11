import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  @Inject()
  private readonly service: PokemonService;

  @Get()
  @CacheKey('manual')
  @CacheTTL(30)
  list() {
    return this.service.list();
  }

  @Get('auto')
  @UseInterceptors(CacheInterceptor)
  list_auto() {
    return this.service.list();
  }
}
