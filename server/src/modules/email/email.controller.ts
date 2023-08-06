import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailSendCodeDTO } from './email.dto';
import { EmailService } from './email.service';
import { Cache } from 'cache-manager';
import { ResponseParams } from 'src/utils/response';

@ApiTags('邮件模块')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @ApiOperation({ summary: '发送验证码' })
  @ApiBody({ type: EmailSendCodeDTO })
  @Post('send')
  async send(@Body() params: EmailSendCodeDTO): Promise<ResponseParams> {
    const code = await this.emailService.send(params.email, 'Windos Chrome', '192.168.0.1');
    this.cacheManager.set(params.email, code, 5 * 60);
    return { message: 'OK' };
  }
}
