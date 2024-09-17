import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { NewProductDTO } from './dto/newProduct.dto';


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
            throw(error)
        }
    }

    async getByCategory(category: string): Promise<Product[]> {
        try {
            return await this.productModel.find({category_id: category})
        } catch (error) {
            throw('Error product service getByCAtegory.' + error.message)
        }
    }

    async create(data: NewProductDTO): Promise<Product> {
        try {
            return await this.productModel.create(data)           
        } catch (error) {
            console.log(error.message)
            throw('Error product service create.' + error.message)
        }
    }

    async updateField(productId: string, fieldName: string, fieldValue: boolean | string | number): Promise<Product> {
        try {
            const product = await this.productModel.findById(productId);
            if (!product) throw new NotFoundException('Producto no encontrado');

            product[fieldName] = fieldValue;
            await product.save();
            return product;
        } catch (error) {
            throw new Error('Error product service updateField: ' + error.message);
        }
    }

    async deleteProduct(id: string): Promise<Product> {
        try {
            return await this.productModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error product service deleteProduct: ' + error.message);
        }
    }

    async getActiveProducts(): Promise<Product[]> {
        try {           
            return await this.productModel.find({active: true});
        } catch (error) {
            throw new Error('Error product service getActiveproducts: ' + error.message);
        }
    }

}
