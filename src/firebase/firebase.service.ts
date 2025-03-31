import * as firebaseAdmin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

@Injectable()
export class FirebaseService {
    async createUser (props: CreateRequest): Promise<UserRecord> {
        return await firebaseAdmin.auth().createUser(props);
    }
}