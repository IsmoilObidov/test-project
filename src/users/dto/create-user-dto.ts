import { IsDateString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  password: string;
}
