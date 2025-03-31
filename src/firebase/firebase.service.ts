import * as firebaseAdmin from 'firebase-admin';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { FirebaseConfigService } from './firebase-config.service';
import axios from 'axios';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseService {

    private readonly apiKey: string;

    constructor(firebaseConfig: FirebaseConfigService) {
        this.apiKey = firebaseConfig.apiKey;
    }

    async createUser (props: CreateRequest): Promise<UserRecord> {
        return await firebaseAdmin.auth().createUser(props).catch(this.handleFirebaseAuthError) as UserRecord;
    }

    async verifyIdToken(token: string): Promise<DecodedIdToken> {
        return await firebaseAdmin.auth().verifyIdToken(token).catch(this.handleFirebaseAuthError) as DecodedIdToken;
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
        return await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true,
        }).catch(this.handleRestApiError);
    }

    private async sendPostRequest(url: string, data: any) {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json'}
        });
        return response.data;
    }

    private handleFirebaseAuthError(error: any) {
        if (error.code?.startWith('auth/')) {
            throw new BadRequestException(error.message);
        }
        throw new Error(error.message);
    }

    private handleRestApiError(error: any) {
        if (error.message?.data?.error?.code === 400) {
            const messageKey = error.response?.data?.error?.message;
            const message = 
            {
                INVALID_LOGIN_CREDENTIALS: 'Invalid login credentials',
                INVALID_REFRESH_TOKEN: 'Invalid refresh token',
                TOKEN_EXPIRED: 'Token expired',
                USER_DISABLED: 'User disabled',
            }[messageKey] ?? messageKey;
            throw new BadRequestException(message);
        }
        throw new Error(error.message);
    }
}