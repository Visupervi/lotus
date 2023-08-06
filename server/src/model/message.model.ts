import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  id: string;

  @Column({ type: 'text', comment: '消息体内容' })
  content: string;

  @Column({ default: '', comment: '附加信息' })
  extra: string;

  @Column({ default: '', comment: '类型' })
  type: string;

  @CreateDateColumn()
  sendDate?: Date;
}
