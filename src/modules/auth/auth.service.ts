import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken';
import { RedisService } from 'src/redis/redis.service';
import { UsersDto } from '../users/dto/users.dto';
import { KeySession } from './interface/key-session.interface';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly redisService:RedisService) {}

  public async validateUser({email, password}:AuthDto) {
    try {
      const user = await this.userService.findUserByEmail(email);
      console.log('user', user)
      if (!user) throw new UnauthorizedException('User not found');
       console.log('password', password)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('isPasswordValid', isPasswordValid)
      if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
      
      let tokens= {
        access_token: jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
        refresh_token: jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'}),
      }
      await this.redisService.set(`SESSION:${user.email}`, {accessToken:tokens.access_token,refreshtoken:tokens.refresh_token}, 60*60*24*2);
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  public async refreshToken(email: string, refresh_token: string) {
    try {
      const sessionToken:KeySession = await this.redisService.get(`SESSION:${email}`);
      if (!sessionToken) throw new UnauthorizedException('Session expired');
      if (refresh_token !== sessionToken.refreshtoken) throw new UnauthorizedException('Invalid refresh token');

      let decoded;
      try {
        decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET) as { email: string };
      } catch (error) {
        throw new UnauthorizedException('Refresh token expired or invalid');
      }

      const newTokens = {
        access_token: jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '15m',
        }),
        refresh_token: jwt.sign({ email: decoded.email }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '2d',
        }),
      };

      await this.redisService.set(`SESSION:${email}`, {accessToken:newTokens.access_token,refreshtoken:newTokens.refresh_token}, 60*60*24*2);

      return newTokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to refresh token');
    }
  }

  public async register(userDto:UsersDto) {
    try {
      const user = await this.userService.findUserByEmail(userDto.email);
      if (user) throw new UnauthorizedException('User already exists');
      const newUser = await this.userService.createUser(userDto);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  public async logout(email) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) throw new UnauthorizedException('User not found');
      await this.redisService.del(`SESSION:${user.email}`);
      return { message: 'Logged out' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
