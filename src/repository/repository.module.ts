import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserModule } from './user/user.module';

const DB_CHAIN = 'mongodb://localhost:27017/se';

@Module({
  imports: [MongooseModule.forRoot(DB_CHAIN), PokemonModule, UserModule],
  exports: [PokemonModule, UserModule],
})
export class RepositoryModule {}
