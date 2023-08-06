import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({ default: '2956860463@qq.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'fenx5eY98cVruqAAyAjCI' })
  @IsNotEmpty()
  readonly appId: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  readonly password: string;
}

export class UserCreateDTO {
  @ApiProperty({ default: '2956860463@qq.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  readonly role: number;

  @ApiProperty({ default: 'fenx5eY98cVruqAAyAjCI' })
  @IsNotEmpty()
  readonly appId: string;

  @ApiProperty({ default: '随风' })
  @IsNotEmpty()
  readonly userName: string;
}

export class UserUpdateDTO {
  @ApiProperty({ default: '2956860463@qq.com' })
  readonly email: string;

  @ApiProperty({ default: 1 })
  readonly role: number;

  @ApiProperty({ default: '' })
  readonly avatar: string;

  @ApiProperty({ default: '随风' })
  readonly userName: string;
}
