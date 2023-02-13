import { getJokes } from "$lib/logic/getJokes";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET = (async ({url})=>{
    const jokes = await getJokes()
    return json({jokes:jokes});
}) satisfies RequestHandler;