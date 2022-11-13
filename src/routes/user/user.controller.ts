import { Controller } from '@nestjs/common';
import { User, UserRepository } from '@repository';
import { CrudController } from '@routes/common';
import { ApiTags } from '@nestjs/swagger';

const ENDPOINT_URL = 'user';

@ApiTags(ENDPOINT_URL)
@Controller(ENDPOINT_URL)
export class UserController extends CrudController<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, User);
  }
}
