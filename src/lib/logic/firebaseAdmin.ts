import { adminApp } from "$lib/firebaseAdminExport";
import { getAuth } from "firebase-admin/auth"

export class FirebaseAdmin {
    private app;
    constructor() {
        this.app = getAuth(adminApp);
    }
    async validateCredential(token: string) {
        this.app.verifyIdToken(token)
        return true;

    }
    async getUserId(token: string) {
        const tokenResp = await this.app.verifyIdToken(token)
        return tokenResp.uid;
    }

}