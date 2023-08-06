import { Inject, Logger, forwardRef } from '@nestjs/common';
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from 'src/modules/user/user.service';
import { MessageService } from 'src/modules/message/message.service';
import { RoomService } from 'src/modules/room/room.service';
import { IMCreateRoomOptions } from '../socket.dto';
import WsResponseUtil from 'src/utils/wsResponse';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketRoomGateway {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
  ) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('Socket-Room');

  @SubscribeMessage(IMEvents.createRoom)
  async createRoom(@ConnectedSocket() client: Socket, @MessageBody() data: IMCreateRoomOptions) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        return { message: 'OK' };
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }
}
