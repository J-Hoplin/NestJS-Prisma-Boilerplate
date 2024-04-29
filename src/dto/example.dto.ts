// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { IsNotEmpty, IsString } from 'class-validator';

// Custom Packages
import { PaginationQuery } from '@app/common/decorator';

export class ExampleQuery extends PaginationQuery {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;
}
