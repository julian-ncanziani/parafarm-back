import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { NewCategoryDTO } from './dto/newCategory.dto';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Post()
  async newCategory(@Body() data: NewCategoryDTO) {
    return await this.categoryService.create(data);
  }
}
