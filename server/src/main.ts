import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ResultInterceptor } from './interceptor/result.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { getConfig } from './utils';
import { SocketIoAdapter } from './modules/socket/scoekt.adapter';
import { AllExceptionFilter } from './filter/all-exception.filer';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initAppRoute } from './library/appDataSource';
import { passwordHash } from './utils/pasd.utils';

const { PORT } = getConfig();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (errors = []) => {
        const err = errors[0].constraints[Object.keys(errors[0].constraints)[0]];
        throw new HttpException(err, HttpStatus.FORBIDDEN);
      },
    }),
  );

  const socketIoAdapter = new SocketIoAdapter(app);
  await socketIoAdapter.connectToRedis();
  app.useWebSocketAdapter(socketIoAdapter as any);

  app.useGlobalInterceptors(new ResultInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const options = new DocumentBuilder().setTitle('Lotus').setDescription('聊天服务').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
  await initAppRoute(document);
}
bootstrap();
