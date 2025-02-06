
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Categories {
  @Prop({unique: true})
  name: string;

  @Prop({required: true})
  userId: string;

  @Prop({default: true})
  status: boolean;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
