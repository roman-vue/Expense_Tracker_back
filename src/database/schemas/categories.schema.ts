
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Categories {
  @Prop()
  name: string;

  @Prop({default: true})
  status: boolean;

}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
