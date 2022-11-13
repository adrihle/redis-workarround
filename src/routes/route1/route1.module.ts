import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository/repository.module';
import { User, UserRepository } from '@repository/user';
import { CrudModule } from '@routes/crud/crud.module';
import { BASE_ROUTE, Route1Controller } from './route1.controller';

@Module({
  imports: [
    RepositoryModule,
    CrudModule.register<User>({
      routeBase: BASE_ROUTE,
      repository: UserRepository,
      repositoryModule: RepositoryModule,
      DTO: User,
    }),
  ],
  controllers: [Route1Controller],
})
export class Route1Module {}
