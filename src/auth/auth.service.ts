import { FirebaseService } from 'src/firebase/firebase.service';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login({ email, password }: LoginDto) {
    const { idToken, refreshToken, expiresIn } =
      await this.firebaseService.signInWithEmailAndPassword(email, password);
    return { idToken, refreshToken, expiresIn };
  }

  async logout(token: string) {
    const { uid } = await this.firebaseService.verifyIdToken(token);
    return await this.firebaseService.revokeRefreshToken(uid);
  }

  async refreshAuthToken(refreshToken: string) {
    return await this.firebaseService.refreshAuthToken(refreshToken);
  }

  async sendPasswordResetEmail(email: string) {
    return await this.firebaseService.sendPasswordResetEmail(email)
  }

  async generatePasswordResetLink(email: string) {
    return await this.firebaseService.generatePasswordResetLink(email);
  }

  async confirmPasswordReset(oobCode: string, newPassword: string ) {
    await this.firebaseService.confirmPasswordReset(oobCode, newPassword);
  }

}