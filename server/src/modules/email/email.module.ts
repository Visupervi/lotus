import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
