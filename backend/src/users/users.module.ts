import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema
    ],
    controllers: [UsersController], // Register the Users Controller
    providers: [UsersService], // Register the Users Service
    exports: [UsersService], // Export Users Service for use in other modules if needed
})
export class UsersModule {}