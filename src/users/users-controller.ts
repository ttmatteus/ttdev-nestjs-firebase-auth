import { RegisterUserDto } from './dtos/register-user.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";



@Controller('users')
export class UsersController {
    constructor(private readonly usersSerivice: UsersService) {}

    @Post('register')
    async RegisterUserDto(@Body() dto: RegisterUserDto) {
        return await this.usersSerivice.registerUser(dto);
    }
}
