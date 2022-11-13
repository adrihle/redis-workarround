import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';

const ENDPOINT_URL = 'pokemon';

@ApiTags(ENDPOINT_URL)
@Controller(ENDPOINT_URL)
export class PokemonController {
  @Inject()
  private readonly service: PokemonService;

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.get(id);
  }
}
