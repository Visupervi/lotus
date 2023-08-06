import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { ResponseParams } from '../..//utils/response';
import { setDataToken } from '../..//utils/token';
import { UserCreateDTO, UserLoginDTO, UserUpdateDTO } from './user.dto';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: UserLoginDTO })
  @Post('login')
  async login(@Body() params: UserLoginDTO): Promise<ResponseParams> {
    const info = await this.usersService.login(params);
    const token = setDataToken({
      userId: info.id,
      roleId: info.role.id,
      lesseeId: info.lessee.id,
      userName: info.userName,
    });
    return {
      data: {
        userName: info.userName,
        avatar: info.avatar,
        label: info.label,
        email: info.email,
        userId: info.id,
        userSig: token,
      },
    };
  }

  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: UserCreateDTO })
  @Post('create')
  async created(@Body() params: UserCreateDTO): Promise<ResponseParams> {
    const code = await this.cacheManager.get(params.email);
    if (params.code != code) {
      throw new HttpException('email code error', HttpStatus.NOT_FOUND);
    }
    const info = await this.usersService.created(params);
    return { data: info };
  }

  @ApiOperation({ summary: '修改信息' })
  @ApiBody({ type: UserUpdateDTO })
  @Post('update')
  @UseGuards(AuthGuard)
  async updated(@Req() req, @Body() params: UserUpdateDTO): Promise<ResponseParams> {
    const userId = req.user.userId;
    await this.usersService.update(userId, params);
    return { message: '成功' };
  }
}
