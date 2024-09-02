import { Schema } from 'mongoose';

// Definir el esquema de Producto
export const ProductSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  email: { type: String, unique: true },
});