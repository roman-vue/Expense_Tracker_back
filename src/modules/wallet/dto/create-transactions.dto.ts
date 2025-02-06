import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionsDto {
  @ApiProperty({ description: 'Amount of the transaction', example: 100 })
  amount: number;
  @ApiProperty({ description: 'Category of the transaction', example: 'id categoria' })
  category: string;
  @ApiProperty({ description: 'Description of the transaction', example: 'description' })
  description: string;
}
