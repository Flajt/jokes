import { auth } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { RequestHandler } from "./$types";
import cookie from "cookie";
import { error } from "@sveltejs/kit";
import {env} from "$env/dynamic/private";

export const POST = (async ({ request }) => {
    const json = await request.json();
    const email = json["email"];
    const password = json["password"];
    if (json["login"] == true) {
        try {
            const resp = await signInWithEmailAndPassword(auth, email, password);
           const refreshToken = resp.user.refreshToken;
            const idToken = await resp.user.getIdToken()
            return new Response(null, {
                status: 302, headers: {
                    location: "/",
                    "set-cookie": [cookie.serialize("refreshToken", refreshToken, { path:"/",httpOnly: true, secure: env.PROD==="false", maxAge: 60 * 60 * 24 * 30, sameSite: true }), cookie.serialize("idToken", idToken, { path:"/",httpOnly: true, secure: env.PROD==="false", maxAge: 60 * 60 * 24 * 30, sameSite: true })],
                }
            });

        } catch (e: any) {
            return new Response(null, { status: 401,statusText:e.toString() })
        }
    } else {
        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password)
            const refreshToken = resp.user.refreshToken;
            const idToken = await resp.user.getIdToken()
            return new Response(null, {
                status: 302, headers: {
                    location: "/",
                    "set-cookie": [cookie.serialize("refreshToken", refreshToken, { path:"/",httpOnly: true, secure: env.PROD==="false"? false : true, maxAge: 60 * 60 * 24 * 30, sameSite: true }), cookie.serialize("idToken", idToken, { path:"/",httpOnly: true, secure: env.PROD==="false"? false : true, maxAge: 60 * 60, sameSite: true })],
                }
            });
        } catch (e: any) {
            return new Response(null, { status: 400, statusText: e.toString() })
        }

    }
}) satisfies RequestHandler

export const PUT = (async ({request})=>{
    try{
        await auth.signOut();
        return new Response(String("Ok"),{status: 200,headers:{"set-cookie":[cookie.serialize("refreshToken", "null", { path:"/",httpOnly: true, secure: env.PROD==="false"? false : true, maxAge: 60 * 60, sameSite: true }), cookie.serialize("idToken", "null", { path:"/",httpOnly: true, secure: env.PROD==="false"? false : true, maxAge: 60 * 60 , sameSite: true})]}});
    }catch(e:any){
        throw error(500,e.toString())
    }
})satisfies RequestHandler