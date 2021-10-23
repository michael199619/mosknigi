import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { IRequest } from '../types/request';

@Injectable()
export class SocialQueryRoleRequiredGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req: IRequest = ctx.switchToHttp().getRequest();
    const role = req.query['role'];
    const platformUrl = req.query.platformUrl;

    if (!platformUrl) {
      throw new BadRequestException('platformUrl is required');
    }

    return true;
  }
}
