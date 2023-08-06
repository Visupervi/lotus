import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Role } from './role.model';

@Entity()
export class Routers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '路由名称' })
  name: string;

  @Column({ comment: '链接' })
  url: string;

  @Column({ comment: '请求方式' })
  method: string;

  @ManyToMany(() => Role, (role) => role.routes)
  roles: Role[];

  @Column({ default: true, comment: '是否可用' })
  isActive: boolean;

  @Column({ default: true, comment: '是否打开' })
  isOpen: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
