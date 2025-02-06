import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from 'src/database/schemas/categories.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) 
  private CategoriesModel: Model<Categories>, private usersService:UsersService){}
 async create({name}: CreateCategoryDto, email:string) {
    let user = await this.usersService.findUserByEmail(email)
    const newCategory = new this.CategoriesModel({name, userId: user._id});
    const save = await newCategory.save();
    return save;
  }

  async findAll(email: string) {
    let user = await this.usersService.findUserByEmail(email)
    return await this.CategoriesModel.find({status: true, userId: user._id});
  }

  async findOne(id: string, email: string) {
    let user = await this.usersService.findUserByEmail(email)
    const category = await this.CategoriesModel.findOne({_id: id,userId: user._id, status: true});
    if (!category) {
       throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, email: string) {
    const find = await this.findOne(id, email)
    find.name = updateCategoryDto.name
    const newCategory = new this.CategoriesModel(find);
    return await newCategory.save();
  }

  async remove(id: string, email: string) {
    const find = await this.findOne(id, email)
    find.status = false
    const newCategory = new this.CategoriesModel(find);
    await newCategory.save();
    return 'category deleted successfully'
  }
}
