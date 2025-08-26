import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LocalGuard } from 'src/guards/local-guard/local-guard.guard';
import { CreateTransactionsDto } from './dto/create-transactions.dto';

@UseGuards(LocalGuard)
@ApiBearerAuth()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({summary: 'Created wallet'})
  create(@Body() createWalletDto: CreateWalletDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.create(createWalletDto, userEmail);
  }

  @Get()
  @ApiOperation({summary: 'List wallet'})
  findAll(@Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.findAll(userEmail);
  }

  @Get(':id')
   @ApiOperation({summary: 'Datils wallet with transactions'})
  findOne(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.findOne(id, userEmail);
  }

  @Patch(':id')
  @ApiOperation({summary: 'updated wallet'})
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.update(id, updateWalletDto, userEmail);
  }

  @Delete(':id')
  @ApiOperation({summary: 'deleted wallet'})
  remove(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.remove(id, userEmail);
  }

  @Post('/add-transactions/:walletId')
  @ApiOperation({summary: 'Registrer transactions'})
  addTransactions(@Param('walletId') walletId: string, @Body() createTransactionsDto: CreateTransactionsDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.addTransactions(walletId, createTransactionsDto, userEmail);
  }

  @Put('/edit-transactions/:transactionId/:walletId')
   @ApiOperation({summary: 'Edit transactions'})
  editTransactions(@Param('transactionId') transactionId: string, @Param('walletId') walletId: string, @Body() createTransactionsDto: CreateTransactionsDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.editTransactions(transactionId,walletId, userEmail, createTransactionsDto);
  }

  
  @Delete('/delete-transactions/:transactionId/:walletId')
     @ApiOperation({summary: 'Delete transactions'})
  deleteTransactions(@Param('transactionId') transactionId: string, @Param('walletId') walletId: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.walletService.deleteTransactions(transactionId,walletId, userEmail);
  }
}
