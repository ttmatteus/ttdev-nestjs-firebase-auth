import { AuthGuard } from './../auth/auth.guard';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { FirebaseService } from 'src/firebase/firebase.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IdToken } from 'src/auth/id-token.decorator';



@Controller('users')
export class UsersController {
    constructor(private readonly usersSerivice: UsersService,
        private readonly firebaseService: FirebaseService,
    ) {}

    @Post('register')
    async RegisterUserDto(@Body() dto: RegisterUserDto) {
        return await this.usersSerivice.registerUser(dto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async profile(@IdToken() token: string) {
        return await this.firebaseService.verifyIdToken(token);
    }
}
