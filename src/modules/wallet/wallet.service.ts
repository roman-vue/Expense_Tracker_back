import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from 'src/database/schemas/wallet.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>, private usersService: UsersService){}
  async create({name}: CreateWalletDto, email: string) {
    const user = await this.usersService.findUserByEmail(email);
    let newWallet = {
      name,
      balance: 0,
      userId: user._id,
    }
     const wallet = new this.walletModel(newWallet);
      return await wallet.save();
  }

  async findAll(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const wallets = await this.walletModel.find({userId: user._id, status: true});
    return wallets;
  }

  async findOne(id: string,email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const find = await this.walletModel.findOne({_id: id, userId: user._id, status: true});
    if(!find) {
      throw new NotFoundException('Wallet not found');
    }
    return find
  }

  async update(id: string, updateWalletDto: UpdateWalletDto, email: string) {
    const find = await this.findOne(id, email);
    find.name = updateWalletDto.name;
    return await find.save();
  }

  async remove(id: string, email: string) {
    const find = await this.findOne(id, email);
    find.status = false;
    const remove = new this.walletModel(find)
    return await remove.save();
  }
}
