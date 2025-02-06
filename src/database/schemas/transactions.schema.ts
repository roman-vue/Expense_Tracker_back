import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionsDocument = HydratedDocument<Transactions>;

@Schema()
export class Transactions {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Wallet' }], required: true })
  wallet: Types.ObjectId;

  @Prop({ unique: true })
  amount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], required: true })
  category: Types.ObjectId;

  @Prop({ required: true })
  description:string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
