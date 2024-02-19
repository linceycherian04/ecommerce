import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { createUserDTO } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<UserDocument>){}
        async addUser(createUserDTO: createUserDTO) {
            
        }
    
}
