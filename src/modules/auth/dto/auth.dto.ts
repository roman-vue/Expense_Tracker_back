import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class AuthDto {
    @ApiProperty({type:String, description:"email", default:"test@example.com"})
    @IsEmail()
    email: string
    @ApiProperty({type:String, description:"email", default:"password123"})
    @IsString()
    password: string
}