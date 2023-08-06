import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './utils';
import { redisStore } from 'cache-manager-redis-store';
import { EmailModule } from './modules/email/email.module';
import { AssetsModule } from './modules/assets/assets.module';
import { SocketModule } from './modules/socket/socket.module';
import { RoleModule } from './modules/role/role.module';
import { MessageModule } from './modules/message/message.module';
import { FriendModule } from './modules/friend/friend.module';
import { RoomModule } from './modules/room/room.module';
import { FileModule } from './modules/file/file.module';

const { MYSQL, REDIS, MONGO } = getConfig();
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // @ts-ignore
      store: async () =>
        await redisStore({
          password: REDIS.PSWD,
          socket: {
            host: REDIS.HOST,
            port: REDIS.PORT,
          },
        }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...MYSQL,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forRoot({
      name: MONGO.NAME,
      type: 'mongodb',
      host: MONGO.HOST,
      port: MONGO.PORT,
      database: 'chat',
      entities: [],
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AssetsModule,
    FileModule,
    EmailModule,
    UserModule,
    RoleModule,
    FriendModule,
    SocketModule,
    RoomModule,
    MessageModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
