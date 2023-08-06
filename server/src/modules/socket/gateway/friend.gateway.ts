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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from 'src/modules/user/user.service';
import { MessageService } from 'src/modules/message/message.service';
import { TokenModel } from 'src/utils/token';
import { IMEvents } from '../enum';
import {
  IMAcceptFriendApplication,
  IMAddFriend,
  IMCheckFriend,
  IMDeleteFriendApplication,
  IMRefuseFriendApplication,
  IMSearchFriend,
} from '../socket.dto';
import { FriendService } from 'src/modules/friend/friend.service';
import WsResponseUtil from 'src/utils/wsResponse';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketFriendGateway {
  constructor(
    private readonly usersService: UserService,
    private readonly messageService: MessageService,
    private readonly friendService: FriendService,
  ) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('Socket-Friend');

  @SubscribeMessage(IMEvents.friendCheck)
  async checkFriend(@ConnectedSocket() client: Socket, @MessageBody() params: IMCheckFriend) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.checkFriend(info.userId, params.friendIdList);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendAdd)
  async addFriend(@ConnectedSocket() client: Socket, @MessageBody() params: IMAddFriend) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.addFriend(info.userId, params);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendGetApplicationList)
  async getFriendApplicationList(@ConnectedSocket() client: Socket) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.getFriendApplicationList(info.userId);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendAcceptApplication)
  async acceptFriendApplication(@ConnectedSocket() client: Socket, @MessageBody() params: IMAcceptFriendApplication) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.acceptFriendApplication(info.userId, params.friendId);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendSearch)
  async searchFriend(@ConnectedSocket() client: Socket, @MessageBody() params: IMSearchFriend) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.usersService.findOne(params.email);
        if (res) {
          return WsResponseUtil({ message: 'ok', data: res });
        }
        return WsResponseUtil({ status: false, message: '暂无' });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendRefuseApplication)
  async refuseFriendApplication(@ConnectedSocket() client: Socket, @MessageBody() params: IMRefuseFriendApplication) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.refuseFriendApplication(info.userId, params.friendId);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }

  @SubscribeMessage(IMEvents.friendDeleteApplication)
  async deleteFriendApplication(@ConnectedSocket() client: Socket, @MessageBody() params: IMDeleteFriendApplication) {
    const info: TokenModel = await this.cacheManager.get(client.id);
    if (info) {
      try {
        const res = await this.friendService.deleteFriendApplication(info.userId, params.friendId);
        return WsResponseUtil({ message: 'ok', data: res });
      } catch (error) {
        return WsResponseUtil({ status: false, message: error.message });
      }
    }
  }
}
