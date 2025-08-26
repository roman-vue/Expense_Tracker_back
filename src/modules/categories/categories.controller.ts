import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LocalGuard } from 'src/guards/local-guard/local-guard.guard';

@UseGuards(LocalGuard)
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({summary:'Create categorie'})
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.create(createCategoryDto, userEmail);
  }

  @Get()
  @ApiOperation({summary:'List categories'})
  findAll(@Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.findAll(userEmail);
  }

  @Get(':id')
  @ApiOperation({summary:'Find categorie by id'})
  findOne(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.findOne(id, userEmail);
  }

  @Patch(':id')
  @ApiOperation({summary:'Update categorie'})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto , @Request() req) {
    const userEmail = req.headers['user-email'] as string;
    return this.categoriesService.update(id, updateCategoryDto, userEmail);
  }

  @Delete(':id')
  @ApiOperation({summary:'Delete categorie'})
  remove(@Param('id') id: string, @Request() req) {
    const userEmail = req.headers['user-email'] as string;  
    return this.categoriesService.remove(id, userEmail);
  }
}
