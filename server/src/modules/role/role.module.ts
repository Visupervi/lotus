import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../model/role.model';
import { Routers } from '../../model/routers.model';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Routers])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
