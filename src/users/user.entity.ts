import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  birthday: string;

  @Column()
  avatar: string|null|undefined;


  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
  
  @Column()
  mailing: string;

  @Column()
  zodiac_year: string;

  @Column()
  is_admin: string;


}
