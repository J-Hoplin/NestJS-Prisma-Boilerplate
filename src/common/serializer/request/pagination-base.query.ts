// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

/**
 * DTO for pagination
 *
 * Page: Default value 1
 * Limit: Default value 10
 */
export class PaginationQuery {
  @ApiProperty({
    default: 1,
    description: 'Default value & Starting from 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    default: 10,
    description: 'Default value is 10 Starting from 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit: number = 10;

  @ApiProperty({
    required: false,
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.desc,
    description: 'Order to sort datas',
  })
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  readonly order: Prisma.SortOrder = Prisma.SortOrder.desc;
}
