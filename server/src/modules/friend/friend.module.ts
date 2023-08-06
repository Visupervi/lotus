import { Module, forwardRef } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/model/friend.model';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Friend]),
    forwardRef(() => UserModule),
    forwardRef(() => RoomModule),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
