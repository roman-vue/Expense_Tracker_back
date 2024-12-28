import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('USERS')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/created')
    public async signUp(@Body() usersDto: UsersDto){
        return await this.usersService.createUser(usersDto)
    }
}
