import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import ResponseUtil from '../utils/response';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'object') {
          return ResponseUtil(instanceToPlain(data));
        } else {
          return data;
        }
      }),
    );
  }
}
