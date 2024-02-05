import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Signup & Document;

@Schema()
export class Signup {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);
