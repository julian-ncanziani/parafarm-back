import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';


@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async getAll(): Promise<Product[]>{
        try {
            return await this.productModel.find();           
        } catch (error) {
            throw('Error product service getAll.' + error.message)
        }
    }

    async getByName(name): Promise<Product> {
        try {
            const regex = new RegExp(`^\\s*${name}\\s*$`, 'i')
            const product = await this.productModel.findOne({name: regex})
            if(!product) throw new NotFoundException('Producto no encontrado')
            return product;
        } catch (error) {
            throw(error);
        }
    }

    async getByCategory(category: string): Promise<Product[]> {
        try {
            return await this.productModel.find({category_id: category})
        } catch (error) {
            throw('Error product service getByCAtegory.' + error.message)
        }
    }

}
