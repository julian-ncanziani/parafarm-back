import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly stock: number;
  readonly price: number;
}