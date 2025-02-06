
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop({required: true, unique: true})
    name: string;
  
    @Prop({required: true})
    userId: string;

    @Prop({default: 0})
    balance: number;
  
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Transaction' }], default: [] })
    transactions: Types.ObjectId[];
    
    @Prop({default: true})
    status: boolean;
  
    @Prop({default: new Date()})
    createdAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
