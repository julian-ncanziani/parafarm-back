import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType } from 'mongoose';
import { Category } from '../category/category.schema'; // Importa el esquema de categoría

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  product_id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop({ type: String , ref: 'Category' }) // Relación con la categoría
  category_id;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);