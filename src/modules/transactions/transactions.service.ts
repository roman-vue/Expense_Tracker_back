import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from 'src/database/schemas/transactions.schema';
import { Model } from 'mongoose';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transactions.name) private transactionsModule: Model<Transactions>, private walletService:WalletService ){}

  async create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
