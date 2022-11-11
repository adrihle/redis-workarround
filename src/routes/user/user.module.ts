import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryModule } from '@repository';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}