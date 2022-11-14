import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { BASE_ROUTE, UserController } from './user.controller';
import { RepositoryModule, User, UserRepository } from '@repository';
import { CrudModule } from '@routes/common';

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
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
