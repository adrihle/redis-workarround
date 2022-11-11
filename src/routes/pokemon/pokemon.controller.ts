import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
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
