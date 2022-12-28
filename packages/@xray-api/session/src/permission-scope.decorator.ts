import {PermissionGroupScopes} from '@xray/types';
import {HasSession} from './has-session.decorator';
import {PermissionScopeGuard} from './permission-scope.guard';
import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';

export function HasScope(scope: keyof PermissionGroupScopes) {
  return applyDecorators(
    HasSession(),
    SetMetadata('scope', scope),
    UseGuards(PermissionScopeGuard)
  );
}
