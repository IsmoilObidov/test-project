import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneBy(name: string) {
    return this.usersRepository.findOneBy({ name });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, surname, birthdate, password } = createUserDto;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      surname,
      birthdate,
      password: hashedPass,
    });

    return this.usersRepository.save(user);
  }
}
