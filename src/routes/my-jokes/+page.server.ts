import { FirebaseAdmin } from "$lib/logic/firebaseAdmin";
import { getMyJokes } from "$lib/logic/getMyJokes";
import type { PageServerLoad } from "./$types";
import {error} from "@sveltejs/kit"
export const load = (async (params) => {
    try {
        const admin = new FirebaseAdmin();
        const cookieString = params.cookies.get("idToken") ?? "";
        if (cookieString === "")
            throw error(401,"Invalid login creds")
        const isValid = admin.validateCredential(cookieString);
        if (!isValid) {
            throw error(401, "Invalid login creds")
        }
        const uid = await admin.getUserId(cookieString);
        const userJokes = await getMyJokes(uid);
        return {
            myJokes: userJokes.myJokes
        }
    } catch (e:any) {
        console.error(e)
        throw error(400,e.toString());
    }
}) satisfies PageServerLoad