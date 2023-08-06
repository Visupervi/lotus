import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import ResponseUtil, { ResponseParams } from '../utils/response';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(200).json(ResponseUtil({ code: HttpStatus.NOT_MODIFIED, error: exception.message }));
  }
}
