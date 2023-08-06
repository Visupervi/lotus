import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ListDTO } from 'src/utils/dto';

export class RoleCreateDTO {
  @ApiProperty({ default: '基础用户' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: '注册完的用户' })
  @IsNotEmpty()
  readonly label: string;
}

export class RoleDelDTO {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  readonly roleId: number;
}

export class RoleListDTO extends ListDTO {}
