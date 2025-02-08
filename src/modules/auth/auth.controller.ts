import { Controller, Get, Post, Request, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersDto } from '../users/dto/users.dto';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    async login(@Body() AuthDto: AuthDto,@Request() req) {
      return await this.authService.validateUser(AuthDto)
    }

    @Post('refresh/:email/:refresh_token')
    async refresh(@Param('email') email: string,@Param('refresh_token') refresh_token: string) {
      return await this.authService.refreshToken(email, refresh_token)
    }

    @Post('register')
    async register(@Body() userDto: UsersDto) {
      return await this.authService.register(userDto)
    }

    @Post('logout/:email')
    async logout(@Param('email') email:string) {
      return await this.authService.logout(email)
    }

}
