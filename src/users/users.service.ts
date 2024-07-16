import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'reteryut10',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<Users | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
