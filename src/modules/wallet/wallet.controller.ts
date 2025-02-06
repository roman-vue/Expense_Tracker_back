import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalGuard } from 'src/guards/local-guard/local-guard.guard';

@UseGuards(LocalGuard)
@ApiBearerAuth()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.create(createWalletDto, userEmail);
  }

  @Get()
  findAll(@Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.findAll(userEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.findOne(id, userEmail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.update(id, updateWalletDto, userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.remove(id, userEmail);
  }
}
