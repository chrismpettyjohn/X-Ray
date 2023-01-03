import {Reflector} from '@nestjs/core';
import {RequestWithSession} from './session.type';
import {PermissionGroupScopes} from '@xray/types';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PermissionScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scope: keyof PermissionGroupScopes = this.reflector.get(
      'scope',
      context.getHandler()
    );
    const request: RequestWithSession = context.switchToHttp().getRequest();
    const hasScope = request?.user?.rank?.scopes?.[scope];

    if (!hasScope) {
      throw new ForbiddenException("You don't have permission to do this");
    }

    return true;
  }
}
