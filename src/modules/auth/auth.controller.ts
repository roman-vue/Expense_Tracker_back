import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersDto } from '../users/dto/users.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({
        summary: 'Login',
        description: 'Authenticates a user with their credentials and returns an access token and a refresh token.'
    })
    async login(@Body() authDto: AuthDto) {
        return await this.authService.validateUser(authDto);
    }

    @Post('refresh/:email/:refresh_token')
    @ApiOperation({
        summary: 'Refresh token',
        description: 'Takes a valid email and refresh token, and returns a new access token.'
    })
    async refresh(@Param('email') email: string, @Param('refresh_token') refresh_token: string) {
        return await this.authService.refreshToken(email, refresh_token);
    }

    @Post('register')
    @ApiOperation({
        summary: 'Register new user',
        description: 'Registers a new user in the system using the provided information.'
    })
    async register(@Body() userDto: UsersDto) {
        return await this.authService.register(userDto);
    }

    @Post('logout/:email')
    @ApiOperation({
        summary: 'Logout',
        description: 'Logs out the user and removes the refresh token associated with the provided email.'
    })
    async logout(@Param('email') email: string) {
        return await this.authService.logout(email);
    }
}
