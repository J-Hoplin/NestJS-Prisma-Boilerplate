import { PaginationQuery } from '@app/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExampleQuery extends PaginationQuery {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;
}
