import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | undefined> {
    console.log(await this.userService.findOne(id));

    return this.userService.findOne(id);
  }
}
