import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
import { findUsersResponseExample } from './types/user.response.types';

export class FindUsersResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: findUsersResponseExample,
  })
  private data: User[];

  @ApiProperty({
    example: 20,
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80,
  })
  private readonly total: number;

  constructor(results: PaginationInterface<User>, status?: number) {
    this.statusCode = status || 200;
    this.data = results.data;
    this.pageTotal = results.pageTotal;
    this.total = results.total;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      pageTotal: this.pageTotal,
      total: this.total,
    };
  }
}
