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
import { TokenModel } from 'src/utils/token';
import { IMEvents } from '../enum';
import { IMHistoryList, IMSendMessageOptions } from '../socket.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from 'src/modules/user/user.service';
import { MessageService } from 'src/modules/message/message.service';
import { RoomService } from 'src/modules/room/room.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketMessageGateway {
  constructor(
    private readonly usersService: UserService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('Socket-Message');

  @SubscribeMessage(IMEvents.sendMessage)
  async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: IMSendMessageOptions) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const room = await this.roomService.findRoomAndUsersId(data.roomId);
        if (room) {
          let callbackMsg;
          const messageContent = await this.messageService.createMessageContent({
            type: data.content.type,
            extra: data.content.extra,
            content: data.content,
          });
          for (const iterator of room.users) {
            const message = await this.messageService.createMessage({
              messageId: messageContent.id,
              userId: info.userId,
              friendId: iterator.id,
              roomId: data.roomId,
              read: false,
            });
            const userInfo = await this.usersService.findId(info.userId);
            const res = {
              id: message.id,
              read: false,
              roomId: data.roomId,
              user: userInfo,
              message: messageContent,
              sendDate: message.sendDate,
            };
            if (iterator.id === info.userId) {
              callbackMsg = res;
              continue;
            }
            const socketId = await this.cacheManager.get(iterator.id.toString());
            if (socketId) {
              this.server.to(socketId as string).emit(IMEvents.message, res);
            }
          }
          return callbackMsg;
        }
      } catch (error) {
        return { status: false, message: error.message };
      }
    }
  }

  @SubscribeMessage(IMEvents.historyMessage)
  async historyMessage(@ConnectedSocket() client: Socket, @MessageBody() params: IMHistoryList) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const data = await this.messageService.getMessageList(info.userId, params);
        return data;
      } catch (error) {
        return { status: false, message: error.message };
      }
    }
  }
}
