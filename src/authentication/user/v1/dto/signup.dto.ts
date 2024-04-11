import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserV1SignupDto {
  @ApiProperty({
    example: 'Junho',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    example: 'Yoon',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'hoplin.dev@gmail.com',
  })
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password1234!',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
