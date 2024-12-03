// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserV1SigninDto {
  @Transform(({ value }) => (value as string).toLowerCase())
  @ApiProperty({
    example: 'hoplin.dev@gmail.com',
  })
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
