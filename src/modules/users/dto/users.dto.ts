import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UsersDto {
    @ApiProperty({type: String, description:"name of the user"})
    @IsString()
    readonly name: string
    @ApiProperty({type: String, description:"email of the user"})
    @IsEmail()
    readonly email: string
    @ApiProperty({type: String, description:"password of the user"})
    @IsString()
    readonly password: string
}

export class UpdatedUserDto {
    @ApiProperty({type: String, description:"name of the user"})
    @IsString()
    readonly name: string
    @ApiProperty({type: String, description:"email of the user"})
    @IsEmail()
    readonly email: string
}