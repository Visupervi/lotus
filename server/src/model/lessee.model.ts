import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Role } from './role.model';
import { User } from './user.model';

@Entity()
export class Lessee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '组织名称' })
  name: string;

  @Column({ comment: 'ID' })
  appId: string;

  @Column({ default: '', comment: '简介/备注' })
  label: string;

  @Column({ default: true, comment: '是否启用' })
  isActive: boolean;

  @OneToMany(() => Role, (role) => role.lessee)
  roles: Role[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
