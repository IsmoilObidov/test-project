import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id:id });
  }

  findOneBy(name: string) {
    return this.usersRepository.findOneBy({ name });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
