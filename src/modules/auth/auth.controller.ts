import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-guard/local-guard.guard';
import { AuthDto } from './dto/auth.dto';
import { UsersDto } from '../users/dto/users.dto';
import { AuthService } from './auth.service';
@ApiTags('AUTH')
@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() AuthDto: AuthDto,@Request() req) {
      return req.user; // El usuario validado estará en req.user
    }

    @Post('logout')
    @UseGuards(LocalAuthGuard)
    async logout(@Request() req) {
      return req.logout();
    }

}
