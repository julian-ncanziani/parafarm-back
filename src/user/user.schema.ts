import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({timestamps: true})
export class User extends Document{
    
    @Prop()
    name: string;

    @Prop({unique: true, required: true})
    email:string;

    @Prop({
        type: String, 
        enum: ['admin', 'client'], 
        default: 'client'
    })
    rol: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
    orders: Types.ObjectId[];
}


export const UserSchema = SchemaFactory.createForClass(User);