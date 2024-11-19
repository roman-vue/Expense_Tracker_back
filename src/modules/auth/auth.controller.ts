import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(){}

    @Post('/signIn')
    public async signIn(){}

    @Post('/signUp')
    public async signUp(){}

}
