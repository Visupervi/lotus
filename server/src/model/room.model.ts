import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  users: User[];

  @Column({ default: 1, comment: '1:单聊/2:群聊' })
  type: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
