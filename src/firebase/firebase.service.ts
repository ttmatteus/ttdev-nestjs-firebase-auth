import * as firebaseAdmin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { FirebaseConfigService } from './firebase-config.service';
import axios from 'axios';

@Injectable()
export class FirebaseService {

    private readonly apiKey: string;

    constructor(firebaseConfig: FirebaseConfigService) {
        this.apiKey = firebaseConfig.apiKey;
    }

    async createUser (props: CreateRequest): Promise<UserRecord> {
        return await firebaseAdmin.auth().createUser(props);
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
        return await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true,
        });
    }

    private async sendPostRequest(url: string, data: any) {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json'}
        });
        return response.data;
    }
}