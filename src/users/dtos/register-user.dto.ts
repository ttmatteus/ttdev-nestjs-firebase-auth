import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({ description: "The user's first name" })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ description: "The user's last name" })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ description: "The user's email" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The user's password" })
    @IsNotEmpty()
    @Length(8, 20)
    password: string;

    @ApiProperty({
        description: "The user's roles",
        example: ['viewer', 'editor', 'admin'], 
    })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    roles?: string[];
}