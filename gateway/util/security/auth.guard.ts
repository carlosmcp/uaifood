import { CanActivate, ExecutionContext, Injectable, HttpException, BadRequestException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Security } from './security'
import RoleEnum from './role.enum'
import LOCALE from '../../config/locales';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());

    if (roles === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = request.headers && request.headers.authorization || null;

    if (jwt == null) {
      throw new HttpException(LOCALE.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    } else {
      const token = Security.removeHeaderToken(jwt);
      const decodedToken = Security.validJwtToken(token)
      if (!decodedToken) {
        throw new HttpException(LOCALE.FORBIDDEN, 401);
      } else if (roles.some(item => item == RoleEnum[item])) {
        return true;
      } else {
        throw new HttpException(LOCALE.FORBIDDEN, 403);
      }
    }
  }
}