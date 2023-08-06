import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { ResponseParams } from 'src/utils/response';
import { RoleCreateDTO, RoleListDTO } from './role.dto';
import { ApiBody, ApiOperation, ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('角色模块')
@ApiHeader({ name: 'authorization', description: '验证用户权限字段', required: true })
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '列表' })
  @Post('/')
  @UseGuards(AuthGuard, RolesGuard)
  async index(@Body() params: RoleListDTO) {
    const list = await this.roleService.getList(params);
    return { data: list };
  }

  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: RoleCreateDTO })
  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() params: RoleCreateDTO): Promise<ResponseParams> {
    const res = await this.roleService.create(params);
    return { data: res };
  }
}
