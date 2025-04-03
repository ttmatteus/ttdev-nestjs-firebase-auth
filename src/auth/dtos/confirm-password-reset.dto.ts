import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";


export class ConfirmPasswordResetDto {
    @ApiProperty({ description: "The user's reset code" })
    @IsNotEmpty()
    @IsString()
    oobCode: string;

    @ApiProperty({ description: "The new password" })
    @IsNotEmpty()
    @Length(8, 100)
    newPassword: string;
}