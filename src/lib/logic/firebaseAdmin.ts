import { getAuth } from "firebase-admin/auth";
import type {App} from "firebase-admin/app"

export class FirebaseAdmin {
    private auth;
    constructor(app:App) {
        this.auth = getAuth(app);
    }
    async validateCredential(token: string) {
        this.auth.verifyIdToken(token)
        return true;

    }
    async getUserId(token: string) {
        const tokenResp = await this.auth.verifyIdToken(token)
        return tokenResp.uid;
    }

}