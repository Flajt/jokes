// src/hook.server.ts
import { FirebaseAdmin } from '$lib/logic/firebaseAdmin'
import { adminApp } from '$lib/firebase';
import type { Handle } from '@sveltejs/kit';
const adminWrapper = new FirebaseAdmin(adminApp);


export const handle = (async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/my-jokes')) {
        try{
            const idToken = event.cookies.get("idToken");
            if(!idToken || idToken==="null"){
                 return Response.redirect(event.url.origin+"/login");
            }else{
                await adminWrapper.validateCredential(idToken);
                return await resolve(event)
            }
        }catch(e){
            console.log(e)
            return Response.redirect(event.url.origin+"/login")
            
        }
    }
    return await resolve(event);
   
  }) satisfies Handle;