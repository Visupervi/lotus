import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { SocketBaseGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { SocketMessageGateway } from './gateway/message.gateway';
import { FriendModule } from '../friend/friend.module';
import { SocketFriendGateway } from './gateway/friend.gateway';
import { SocketRoomGateway } from './gateway/room.gateway';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    CacheModule.register(),
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule),
    forwardRef(() => FriendModule),
    forwardRef(() => RoomModule),
  ],
  providers: [SocketBaseGateway, SocketFriendGateway, SocketRoomGateway, SocketMessageGateway],
})
export class SocketModule {}
