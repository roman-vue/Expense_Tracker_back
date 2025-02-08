import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalGuard } from 'src/guards/local-guard/local-guard.guard';

@UseGuards(LocalGuard)
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.create(createCategoryDto, userEmail);
  }

  @Get()
  findAll(@Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.findAll(userEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.findOne(id, userEmail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto , @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.update(id, updateCategoryDto, userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;  
    return this.categoriesService.remove(id, userEmail);
  }
}
