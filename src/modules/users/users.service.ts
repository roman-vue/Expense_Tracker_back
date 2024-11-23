import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/database/schemas/users.schema';
import { UpdatedUserDto, UsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>){}

    public async createUser({name,email,password}:UsersDto){
        try{
            const verifyEmail = await this.findUserByEmail(email)
             if(verifyEmail) throw new ConflictException("User already exists")
            password = await bcrypt.hash(password, 10)
            const newUser = new this.usersModel({name, email, password});
            const saved = await newUser.save();
            return saved
        }catch(error){
            throw new InternalServerErrorException(error)
        }
    }

    public async findUserByEmail(email:string){
        try {
            const find = await this.usersModel.findOne({email, status: true})
            return find
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    public async findUserId(id:string){
        try {
            const find = await this.usersModel.findOne({id, status: true})
            return find;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    public async listUsers(){
        try {
            const find = await this.usersModel.find()
            return find
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    public async updatedUser(id:string,{email, name}:UpdatedUserDto){
        try {
            const find = await this.findUserId(id)
            if(!find) throw new NotFoundException("User not found")
               find.name = name
              find.email = email
            const update = new this.usersModel(find)
            await update.save()
            return update
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
