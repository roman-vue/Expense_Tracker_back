import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty({ description: 'amont', example: 100 })
  amount: string;

  @ApiProperty({description: 'category id', required: true})
  category: string;

  @ApiProperty({ description: 'description', example: 'This is a description' })
  description: string;
}
