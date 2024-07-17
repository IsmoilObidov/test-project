import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  

  @Column()
  user_id: number;
  
  @Column()
  photo: string;

  @OneToOne(type => User, user => user.id)
  photos: User[];

}
