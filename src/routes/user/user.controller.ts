import { Param, Query } from '@nestjs/common';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { User, UserDocument } from '@repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject()
  private readonly service: UserService;

  @Get()
  list(@Query() query: any = {}) {
    return this.service.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() body: User): Promise<UserDocument> {
    return this.service.create(body);
  }
}
