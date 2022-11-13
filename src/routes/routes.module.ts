import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { Route1Module } from './route1/route1.module';
import { Route2Module } from './route2/route2.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PokemonModule, Route1Module, Route2Module],
})
export class RoutesModule {}
