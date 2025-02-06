import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from 'src/database/schemas/wallet.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import {v4} from 'uuid'

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    private usersService: UsersService,
    private categorieService: CategoriesService,
  ) {}
  async create({ name }: CreateWalletDto, email: string) {
    const user = await this.usersService.findUserByEmail(email);
    let newWallet = {
      name,
      balance: 0,
      userId: user._id,
    };
    const wallet = new this.walletModel(newWallet);
    return await wallet.save();
  }

  async findAll(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const wallets = await this.walletModel.find({
      userId: user._id,
      status: true,
    });
    // Calcular el balance para cada wallet
    const walletsWithBalance = wallets.map((wallet) => {
      const totalBalance = wallet.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0,
      );

      return {
        ...wallet.toObject(), // Convertir a objeto plano si es un modelo de Mongoose
        balance: totalBalance, // Agregar el balance
      };
    });

    // Calcular el balance total sumando todas las wallets
    const totalBalance = walletsWithBalance.reduce(
      (sum, wallet) => sum + wallet.balance,
      0,
    );

    return {
      totalBalance, // Agregar el balance total
      wallets: walletsWithBalance, // Lista de wallets con su balance
    };
    return wallets;
  }

  async findOne(id: string, email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const find = await this.walletModel.findOne({
      _id: id,
      userId: user._id,
      status: true,
    });
    if (!find) {
      throw new NotFoundException('Wallet not found');
    }
    return find;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto, email: string) {
    const find = await this.findOne(id, email);
    find.name = updateWalletDto.name;
    return await find.save();
  }

  async remove(id: string, email: string) {
    const find = await this.findOne(id, email);
    find.status = false;
    const remove = new this.walletModel(find);
    return await remove.save();
  }

  async addTransactions(
    walletId: string,
    createTransactionsDto: CreateTransactionsDto,
    email: string,
  ) {
    const wallet = await this.findOne(walletId, email);
    const category = await this.categorieService.findOne(
      createTransactionsDto.category,
      email,
    );
    createTransactionsDto.category = `${category._id}`;
    wallet.transactions.push({id: v4(), ...createTransactionsDto});
    const walletUpdated = new this.walletModel(wallet);
    return await walletUpdated.save();
  }
}
