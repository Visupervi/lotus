import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { getTokenData } from '../utils/token';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('authorization');
    if (authorization) {
      const token = authorization;
      try {
        request.user = getTokenData(token);
      } catch (error) {
        throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
