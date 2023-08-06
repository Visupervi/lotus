import { Module, forwardRef } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../model/room.model';
import { User } from 'src/model/user.model';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User]), forwardRef(() => FriendModule), forwardRef(() => UserModule)],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
