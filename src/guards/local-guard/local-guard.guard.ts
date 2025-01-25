import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';
import * as jwt from 'jsonwebtoken';
import { KeySession } from 'src/modules/auth/interface/key-session.interface';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers['authorization'];
      if (!authHeader)
        { throw new UnauthorizedException('No token provided') }

      const token = authHeader.split(' ')[1]; 
      if (!token) throw new UnauthorizedException('Invalid token format');
  
      
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { email: string };
      const sessionToken:KeySession = await this.redisService.get(`SESSION:${decoded.email}`);
      if (!sessionToken) throw new UnauthorizedException('Session expired');
      if(sessionToken.accessToken !== token) throw new UnauthorizedException('Invalid token - CONFLICT SESSION');
      request.headers['user-email'] = decoded.email;
      request.user = decoded;

      return true; 
    } catch (error) {
      if(error.message === 'jwt expired'){
        const authHeader = request.headers['authorization'];
        const decoded = jwt.decode(authHeader.split(' ')[1])as { email: string };
        await this.redisService.del(`SESSION:${decoded.email}`);
        throw new UnauthorizedException('Token expired');
      } 
      throw new UnauthorizedException(error);
    }
  }
}
