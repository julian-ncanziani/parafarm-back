import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { FindOrCreateUserDto } from './dto/findOrCreate.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async getAll() {
        try {
            return await this.userModel.find();            
        } catch (error) {
            console.log('error en userService getAll users' + error)
            throw('Error user service getAll.' + error.message)
        }
    }

    async findOrCreate(dto: FindOrCreateUserDto): Promise<User> {
        const { email, name, rol } = dto;
        try {
            const user = await this.userModel.findOne({email});
            if(user) {
                return user;
            }else {
                const newUser = await this.userModel.create({
                    email,
                    name,
                    rol: rol === null ? 'client' : rol,
                });
                return newUser;
            }
        } catch (error) {
            console.log('error en userService get user' + error)
            throw('Error user service getuser.' + error.message)
        }
    }

}
