import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType } from 'mongoose';
import { Category } from '../category/category.schema'; // Importa el esquema de categoría

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  product_id: string;

  @Prop({unique: true, required: true})
  name: string;

  @Prop()
  description: string;

  @Prop({default: 0})
  price: number;

  @Prop({default: 0})
  stock: number;

  @Prop({ type: String , ref: 'Category', default: "66d8df62ebc4d378276899dd" }) // Relación con la categoría "sin categoria"
  category_id;

  @Prop()
  image: string;

  @Prop({default: false})
  active: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);