import { ListDTO } from 'src/utils/dto';
import { IMUser } from '../socket/socket.dto';

export enum IMMessageTypes {
  text = 'text',
  image = 'image',
}

export interface IMMessage<T> {
  id?: string;
  type: IMMessageTypes;
  extra: string;
  content: T;
}

export interface IMMessageDTO {
  type: IMMessageTypes;
  extra: string;
  content: any;
}

export interface FriendMessageDTO {
  messageId: string;
  userId: number;
  friendId: number;
  roomId: string;
  read: boolean;
  sendDate?: Date;
}

export interface IMFriendHistoryListDTO {
  pageSize: number;
  sort: number;
  messageId?: string;
  roomId: string;
}

export interface IMFriendMessageResult {
  id: string;
  message: IMMessage<any>;
  user: IMUser;
  roomId: string;
  read: boolean;
  sendDate?: Date;
}
