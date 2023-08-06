import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../model/message.model';
import { getConfig } from '../../utils';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RoomMsg } from 'src/model/roomMsg.model';
import {
  FriendMessageDTO,
  IMFriendHistoryListDTO,
  IMFriendMessageResult,
  IMMessageDTO,
  IMMessageTypes,
} from './message.dto';
import { UserService } from '../user/user.service';

const { MONGO } = getConfig();
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(RoomMsg, MONGO.NAME)
    private roomMessageRepository: Repository<RoomMsg>,
    @InjectRepository(Message, MONGO.NAME)
    private messageRepository: Repository<Message>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createMessageContent(options: IMMessageDTO) {
    const message = new Message();
    message.extra = options.extra;
    message.type = options.type;
    message.content = JSON.stringify(options.content);
    const res = await this.messageRepository.save(message);
    return { ...res, content: JSON.parse(res.content) };
  }

  async findMessageContentOne(id: string) {
    // @ts-ignore
    const res = await this.messageRepository.findOne({ _id: id });
    return { ...res, content: JSON.parse(res.content) };
  }

  async createMessage(data: FriendMessageDTO) {
    const message: RoomMsg = {
      messageId: data.messageId,
      friendId: data.friendId,
      userId: data.userId,
      roomId: data.roomId,
      read: data.read,
    };
    const res = await this.roomMessageRepository.save(message);
    return res;
  }

  async getMessageList(userId: number, options: IMFriendHistoryListDTO) {
    const sort = options.sort === 2 ? 'asc' : 'desc';
    let res = [];
    if (options.messageId) {
      const id = new ObjectId(options.messageId);
      res = await this.roomMessageRepository.find({
        // @ts-ignore
        where: { roomId: options.roomId, friendId: userId, messageId: { $lt: id } },
        // @ts-ignore
        order: { messageId: sort === 'asc' ? 1 : -1, sendDate: sort },
        take: options.pageSize,
      });
    } else {
      res = await this.roomMessageRepository.find({
        where: { roomId: options.roomId, friendId: userId },
        order: { sendDate: sort },
        take: options.pageSize,
      });
    }
    const list: IMFriendMessageResult[] = [];
    for (const iterator of res) {
      const messageContent = await this.findMessageContentOne(iterator.messageId);
      if (messageContent) {
        const user = await this.userService.findId(iterator.userId);
        const message: IMFriendMessageResult = {
          message: {
            id: messageContent.id,
            extra: messageContent.extra,
            type: messageContent.type as IMMessageTypes,
            content: messageContent.content,
          },
          sendDate: iterator.sendDate,
          user: user,
          roomId: iterator.roomId,
          read: iterator.read,
          id: iterator.id,
        };
        list.push(message);
      }
    }
    return { list: list.reverse() };
  }

  async getLastMessage(roomId: string) {
    const msg = await this.roomMessageRepository.findOne({ where: { roomId }, order: { sendDate: 'DESC' } });
    if (!msg) return null;
    const message = await this.findMessageContentOne(msg.messageId);
    return message;
  }
}
