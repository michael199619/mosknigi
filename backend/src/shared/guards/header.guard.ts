import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException, NotFoundException,
} from '@nestjs/common';
import { IRequest } from '../types/request';
import {Reflector} from "@nestjs/core";

@Injectable()
export class HeaderGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext) {
    const headers = this.reflector.get<string[]>('headers', ctx.getHandler());
    const req: IRequest = ctx.switchToHttp().getRequest();

    for (let i = 0, keys =Object.keys(headers); i < keys.length; i++) {
      if (req.headers[keys[i].toLowerCase()] !== headers[keys[i]].toLowerCase()) {
        throw new BadRequestException('headers = ' + JSON.stringify(headers))
      }
    }

    return true;
  }
}
