import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'Category name' })
    @IsString()
    name: string;
}
