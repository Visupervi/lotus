import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Lessee } from './lessee.model';
import { User } from './user.model';
import { Routers } from './routers.model';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ default: '', comment: '备注' })
  label: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Lessee, (lessee) => lessee.id)
  lessee: Lessee;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Routers, (routers) => routers.roles)
  @JoinTable()
  routes: Routers[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
