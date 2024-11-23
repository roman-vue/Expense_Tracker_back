import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UsersDto } from '../users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) throw new UnauthorizedException('User not found');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

      // Retorna el usuario sin la contraseña
      const { password: _, ...result } = user;
      delete user.password
      console.log('user', user)
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async createUser(userDto:UsersDto){
    try {
      const create = await this.userService.createUser(userDto)
    return create
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    
  }
}
