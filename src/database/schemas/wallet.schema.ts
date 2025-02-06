
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ITransactions } from 'src/modules/wallet/interface/transactions.interface';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop({required: true, unique: true})
    name: string;
  
    @Prop({required: true})
    userId: string;
  
    @Prop({ default: [] })
    transactions: Array<ITransactions>;
    
    @Prop({default: true})
    status: boolean;
  
    @Prop({default: new Date()})
    createdAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
