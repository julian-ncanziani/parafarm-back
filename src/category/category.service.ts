import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { NewCategoryDTO } from './dto/newCategory.dto';


@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

    async getAll(): Promise<Category[]> {
        try {
            return await this.categoryModel.find();            
        } catch (error) {
            console.log('Error en category service, findAll' + error);
        }
    }

    async create(data: NewCategoryDTO): Promise<Category> {
        try {
            const new_category = await this.categoryModel.create(data);
            return new_category;           
        } catch (error) {
            console.log('Error en category service, create' + error);
        }
    }
}
