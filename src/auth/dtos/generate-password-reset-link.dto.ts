import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class GeneratePaswordResetLinkDto {
    @ApiProperty({ description: "The user's email andress "})
    @IsNotEmpty()
    @IsEmail()
    email: string;
}