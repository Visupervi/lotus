import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Cache } from 'cache-manager';
import { TokenModel, getTokenData } from '../../utils/token';
import { IMChatTypes, IMEvents } from './enum';
import { IMLoginOptions, IMUser } from './socket.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from '../user/user.service';
import { FriendService } from '../friend/friend.service';
import { RoomService } from '../room/room.service';
import { MessageService } from '../message/message.service';
import WsResponseUtil from 'src/utils/wsResponse';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketBaseGateway {
  constructor(
    private readonly usersService: UserService,
    private readonly friendService: FriendService,
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
  ) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('Socket');

  handleConnection(socket: Socket) {
    try {
      this.logger.log(`[链接成功] ${socket.id}`);
    } catch (error) {
      return WsResponseUtil({ status: false, message: error.message });
    }
  }

  handleDisconnect(socket: Socket) {
    try {
      this.cacheManager.get(socket.id).then((res) => {
        if (res) {
          this.cacheManager.del(String(res['userId']));
          this.logger.log(`[离线] ${res['userName']}`);
        }
        this.cacheManager.del(socket.id);
        this.logger.log(`[链接已断开] ${socket.id}`);
      });
      socket.disconnect();
    } catch (error) {
      return WsResponseUtil({ status: false, message: error.message });
    }
  }

  @SubscribeMessage(IMEvents.login)
  async login(@ConnectedSocket() client: Socket, @MessageBody() data: IMLoginOptions) {
    try {
      const info = getTokenData(data.userSig);
      await this.cacheManager.set(info.userId.toString(), client.id);
      await this.cacheManager.set(client.id, info);
      this.logger.log(`[上线] ${info.userName} ${client.id}`);
      return { status: true };
    } catch (error) {
      return WsResponseUtil({ status: false, message: 'token not found' });
    }
  }

  @SubscribeMessage(IMEvents.logout)
  async logout(socket: Socket) {
    try {
      this.cacheManager.get(socket.id).then((res) => {
        if (res) {
          this.cacheManager.del(String(res['userId']));
          this.logger.log(`[退出] ${res['userName']}`);
        }
        this.cacheManager.del(socket.id);
      });
      return { status: true };
    } catch (error) {
      return WsResponseUtil({ status: false, message: error.message });
    }
  }

  @SubscribeMessage(IMEvents.getMyProfile)
  async getMyProfile(@ConnectedSocket() client: Socket) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.usersService.findId(info.userId);
        return WsResponseUtil({ data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.conversationList)
  async friendConversationList(@ConnectedSocket() client: Socket) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const roomList = await this.roomService.getUserRooms(info.userId);
        const friendList = await this.friendService.friendConversationList(info.userId);
        let roomAndFriendlist = [];
        for (const iterator of roomList) {
          if (iterator.type === 1) {
            const item = friendList.find((item) => item.roomId === item.roomId);
            roomAndFriendlist.push({ ...item, conversationType: IMChatTypes.C2C });
          } else {
            roomAndFriendlist.push({ ...iterator, conversationType: IMChatTypes.Group });
          }
        }
        let list = [];
        for (const iterator of roomAndFriendlist) {
          const message = await this.messageService.getLastMessage(iterator.roomId);
          list.push({ ...iterator, lastMessage: message });
        }
        return list;
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }
}
