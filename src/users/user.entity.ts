import { Photo } from 'src/photos/photo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  birthdate: Date;

  @Column()
  password: string;

  @OneToMany((type) => Photo, (photo) => photo.user_id)
  photos: Photo[];
}
