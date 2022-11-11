import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonRepositoryService } from './pokemon.service';

@Module({
  imports: [HttpModule],
  providers: [PokemonRepositoryService],
  exports: [PokemonRepositoryService],
})
export class PokemonModule {}
