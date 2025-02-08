
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string;
  
  @Prop({default: true})
  status: boolean;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
