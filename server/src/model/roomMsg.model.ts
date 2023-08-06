import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class RoomMsg {
  @ObjectIdColumn()
  id?: string;

  @Column()
  messageId: string;

  @Column()
  userId: number;

  @Column()
  friendId: number;

  @Column()
  roomId: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  sendDate?: Date;
}
