import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../..//model/user.model';
import { Role } from '../..//model/role.model';
import { Lessee } from '../../model/lessee.model';
import { Routers } from '../../model/routers.model';
import { Room } from '../../model/room.model';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([User, Role, Lessee, Routers, Room])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
