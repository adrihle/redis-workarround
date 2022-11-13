import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository/repository.module';
import { User, UserRepository } from '@repository/user';
import { CrudModule } from '@routes/crud/crud.module';

@Module({
  imports: [
    RepositoryModule,
    CrudModule.register<User>({
      routeBase: 'route1',
      repository: UserRepository,
      repositoryModule: RepositoryModule,
      DTO: User,
    }),
  ],
})
export class Route1Module {}
