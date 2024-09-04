import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';


@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

    async getAll(): Promise<Category[]> {
        try {
            return await this.categoryModel.find();            
        } catch (error) {
            console.log('Error en category service, findAll' + error);
        }
    };
}
