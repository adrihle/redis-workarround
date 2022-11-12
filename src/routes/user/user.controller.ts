import { Controller } from '@nestjs/common';
import { User, UserRepository } from '@repository';
import { CrudController } from '../module';

@Controller('user')
export class UserController extends CrudController<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
