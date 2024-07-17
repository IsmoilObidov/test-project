import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async index() {
    const $data = this.userService.findAll();
    return $data;
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | undefined| NotFoundException> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    this.userService.create(body);
    return body;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const target = this.userService.findOne(id);
    this.userService.remove(id);
    return ['success', target];
  }
}
