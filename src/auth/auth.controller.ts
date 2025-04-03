import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";
import { IdToken } from "./id-token.decorator";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { sendPasswordResetEmailDto } from "./dtos/send-password-reset-email.dto";
import { GeneratePaswordResetLinkDto } from "./dtos/generate-password-reset-link.dto";
import { ConfirmPasswordResetDto } from "./dtos/confirm-password-reset.dto";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('logout')
    @HttpCode(204)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    logout(@IdToken() token: string) {
        return this.authService.logout(token)
    }

    @Post('refresh-auth')
    @HttpCode(200)
    refreshAuth(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshAuthToken(dto.refreshToken);
    }

    @Post('send-password-reset-email')
    @HttpCode(204)
    sendPasswordResetEmail(@Body() dto: sendPasswordResetEmailDto) {
        return this.authService.sendPasswordResetEmail(dto.email)
    }

    @Post('generate-password-reset-link')
    generatePasswordResetLink(@Body() dto: GeneratePaswordResetLinkDto) {
        return this.authService.generatePasswordResetLink(dto.email);
    }

    @Post('confirm-password-reset')
    @HttpCode(204)
    confirmPasswordReset(@Body() dto: ConfirmPasswordResetDto) {
        return this.authService.confirmPasswordReset(dto.oobCode, dto.newPassword);
    }
}