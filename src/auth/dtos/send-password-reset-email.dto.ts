import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class sendPasswordResetEmailDto {
    @ApiProperty({ description: "the user's email address "})
    @IsNotEmpty()
    @IsEmail()
    email: string;
}