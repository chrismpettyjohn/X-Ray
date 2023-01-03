import {Type} from 'class-transformer';
import {
  CreatePermissionGroupDTO,
  PermissionGroupScopes,
  UpdatePermissionGroupDTO,
} from '@xray/types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermissionGroupScopesDTO implements PermissionGroupScopes {
  @IsBoolean()
  @IsOptional()
  managePermissionGroups!: boolean;
}

export class CreatePermissionGroupDTOImplementation
  implements CreatePermissionGroupDTO
{
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  orderById!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsObject()
  @Type(() => PermissionGroupScopesDTO)
  scopes!: PermissionGroupScopesDTO;
}

export class UpdatePermissionGroupDTOImplementation
  implements UpdatePermissionGroupDTO
{
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  orderById?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsObject()
  @Type(() => PermissionGroupScopesDTO)
  @IsOptional()
  scopes?: PermissionGroupScopesDTO;
}
