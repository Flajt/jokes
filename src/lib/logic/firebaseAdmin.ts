import type { app } from "firebase-admin";

export class FirebaseAdmin {
    private app;
    constructor(app: app.App) {
        this.app = app;
    }
    async validateCredential(token: string) {
        await this.app.auth().verifyIdToken(token)
        return true;

    }
    async getUserId(token: string) {
        const tokenResp = await this.app.auth().verifyIdToken(token)
        return tokenResp.uid;
    }

}