import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: { name: string; email: string; password: string }): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
        this.logger.log('user created','/auth/signup', createdUser.email);
        return createdUser.save();
    }

    async findOne(email: string): Promise<User | undefined> {
        
        this.logger.log(`user email /auth/login ${email}`);
        const user = await this.userModel.findOne({ email }).exec();
        this.logger.log(user)
        if (!user){
            throw new Error("user not found!");
        }

        return user;
    }
}