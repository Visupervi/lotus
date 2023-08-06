import { Message } from 'src/model/message.model';
import { IMMessageDTO } from '../message/message.dto';

export class IMHistoryList {
  pageSize: number;
  sort: number;
  messageId: string;
  roomId: string;
}

export interface IMLoginOptions {
  userId: number;
  userSig: string;
}

export interface IMLoginRep {
  status: boolean;
}

export interface IMUser {
  id: number;
  userName: string;
  email: string;
  phone: string;
  avatar: string;
  label: string;
  isActive: boolean;
}

export interface IMSendMessageOptions {
  roomId: string;
  content: IMMessageDTO;
}

export interface IMFriendRoomInfo {
  roomId: number;
  type: number;
  friend: IMUser;
  lastMessage: Message;
}

export interface IMGroupRoomInfo {
  roomId: number;
  type: number;
  lastMessage: Message;
}

export interface IMAddFriend {
  friendId: number;
  remark: string;
  wording: string;
}

export interface IMSearchFriend {
  email: string;
}
export interface IMCheckFriend {
  friendIdList: number[];
}

export interface IMAcceptFriendApplication {
  friendId: number;
}

export interface IMRefuseFriendApplication {
  friendId: number;
}

export interface IMDeleteFriendApplication {
  friendId: number;
}
export interface IMCreateRoomOptions {
  friendIdList: number[];
}
