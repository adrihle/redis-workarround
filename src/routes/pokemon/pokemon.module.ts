import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [RepositoryModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
