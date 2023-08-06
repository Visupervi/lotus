import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../model/message.model';
import { getConfig } from '../../utils';
import { RoomMsg } from '../../model/roomMsg.model';
import { UserModule } from '../user/user.module';

const { MONGO } = getConfig();
@Module({
  imports: [CacheModule.register(), UserModule, TypeOrmModule.forFeature([RoomMsg, Message], MONGO.NAME)],
  controllers: [],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
