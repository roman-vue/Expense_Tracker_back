import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatedUserDto, UsersDto } from './dto/users.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalGuard } from 'src/guards/local-guard/local-guard.guard';
@ApiTags('USERS')
@UseGuards(LocalGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create user' })
  public async created(@Body() usersDto: UsersDto) {
    return await this.usersService.createUser(usersDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get List Users' })
  public async getListUser() {
    return await this.usersService.listUsers();
  }

  @Get('/info-profile')
  @ApiOperation({ summary: 'Get Info User In Session' })
  public async getInfo(@Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return await this.usersService.findUserId(userEmail);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update infomation' })
  public async updatedInformation (@Body() updateDto: UpdatedUserDto, @Param('id')id:string) {
    return await this.usersService.updatedUser(id,updateDto);
  }

  @Delete('/')
  @ApiOperation({ summary: 'delete infomation' })
  public async deleteUser(@Request()req) {
   const userEmail = req.headers['user-email'] as string;
    return await this.usersService.deleteUser(userEmail);
  }
}
