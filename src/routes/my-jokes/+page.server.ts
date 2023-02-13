import { FirebaseAdmin } from "$lib/logic/firebaseAdmin";
import { getMyJokes } from "$lib/logic/getMyJokes";
import type { PageServerLoad } from "./$types";
import {error} from "@sveltejs/kit"
import { adminWrapper } from "$lib/firebaseAdminExport";
export const load = (async (params) => {
    try {
        const cookieString = params.cookies.get("idToken") ?? "";
        if (cookieString === "")
            throw error(401,"Invalid login creds")
        const isValid = adminWrapper.validateCredential(cookieString);
        if (!isValid) {
            throw error(401, "Invalid login creds")
        }
        const uid = await adminWrapper.getUserId(cookieString);
        const userJokes = await getMyJokes(uid);
        return {
            myJokes: userJokes.myJokes
        }
    } catch (e:any) {
        console.error(e)
        throw error(400,e.toString());
    }
}) satisfies PageServerLoad