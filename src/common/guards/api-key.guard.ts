import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    console.log('ApiKeyGuard.context', context);
    console.log('ApiKeyGuard.context.getHandler', context.getHandler());
    console.log('ApiKeyGuard.isPublic', isPublic);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    console.log('ApiKeyGuard.api_key', this.configService.get('API_KEY'));
    console.log('ApiKeyGuard.authHeader', authHeader);

    return authHeader === this.configService.get('API_KEY');
  }
}
