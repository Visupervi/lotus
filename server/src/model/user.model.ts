import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Lessee } from './lessee.model';
import { Role } from './role.model';
import { Room } from './room.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名称' })
  userName: string;

  @Column({ comment: '邮箱' })
  email: string;

  @Exclude({ toClassOnly: true, toPlainOnly: true })
  @Column({ select: false })
  password: string;

  @Column({ default: null, comment: '手机号', select: false })
  phone: string;

  @Column({ default: '', comment: '头像' })
  avatar: string;

  @Column({ default: '', comment: '简介' })
  label: string;

  @Column({ default: true, comment: '是否启用', select: false })
  isActive: boolean;

  @ManyToOne(() => Lessee, (lessee) => lessee.id)
  lessee: Lessee;

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;
}
