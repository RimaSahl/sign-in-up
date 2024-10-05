import { Body, Controller, Post, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


@Controller('auth')
export class UsersController {
    
    private readonly logger = new Logger(UsersController.name);
    constructor(private readonly usersService: UsersService) {}

    @Post('verifytoken')
    async verifyToken(@Body() jwtToken : {token : string}){
        try {
            this.logger.log("Token is Valid")
            return jwt.verify(jwtToken.token, process.env.JWT_SECRET);
        } catch (error) {
            this.logger.log("Token is expired")
            throw new UnauthorizedException();
        }
    }

    @Post('signup')
    async signup(@Body() createUserDto: { name: string; email: string; password: string }) {
        const user = await this.usersService.create(createUserDto);
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '60s' });
        this.logger.verbose("signup succesful email", user)
        return { message: 'signup successful' , token};
    }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        try{
            const user = await this.usersService.findOne(loginDto.email);
            if (user && await bcrypt.compare(loginDto.password, user.password)) {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '60s' });
                this.logger.log("login succesful email", user.email)
                return { message: 'Login successful' , token};
            }else{
                throw new Error("invalid credential");
            }

        }catch(err){
            this.logger.error("login failed email err", err.message)
                throw new Error(err.message);

        }
    }
}