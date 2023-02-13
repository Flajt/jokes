import { FirebaseAdmin } from "$lib/logic/firebaseAdmin";
import { saveJoke } from "$lib/logic/saveJoke";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"
import cookie from "cookie";
import { deleteJoke } from "$lib/logic/deleteJoke";
const admin = new FirebaseAdmin();
export const POST = (async ({request})=>{
    try{
    const json = await request.json();
    const parsedCookie = cookie.parse(request.headers.get("Cookie")??"")
    const idToken = parsedCookie.idToken
    const userId = await admin.getUserId(idToken);
    await saveJoke(json["id"],userId)
    return new Response(String("Ok"));
    }catch(e:any){
        throw error(400,e.toString());
    }
}) satisfies RequestHandler

export const DELETE = (async ({request})=>{
    try{
    const json = await request.json();
    const parsedCookie = cookie.parse(request.headers.get("Cookie")??"")
    const idToken = parsedCookie.idToken
    const userId = await admin.getUserId(idToken);
    await deleteJoke(userId,json["id"])
    return new Response(String("Ok"));
    }catch(e:any){
        throw error(400,e.toString());
    }
}) satisfies RequestHandler