import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from 'src/database/schemas/categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private CategoriesModel: Model<Categories>){}
 async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.CategoriesModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAll() {
    return await this.CategoriesModel.find({status: true});
  }

  async findOne(id: string) {
    const category = await this.CategoriesModel.findOne({_id: id, status: true});
    if (!category) {
       throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const find = await this.findOne(id)
    find.name = updateCategoryDto.name
    const newCategory = new this.CategoriesModel(find);
    return await newCategory.save();
  }

  async remove(id: string) {
    const find = await this.findOne(id)
    find.status = false
    const newCategory = new this.CategoriesModel(find);
    await newCategory.save();
    return 'category deleted successfully'
  }
}
