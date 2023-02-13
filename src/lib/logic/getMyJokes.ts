import { auth, db } from "$lib/firebase";
import { child, get, ref } from "firebase/database";

export async function getMyJokes(userid: string) {
    const resp = await get(child(ref(db),userid))
    if (!resp.exists()) {
        return { myJokes: []}
    } else {
        const jokes = [];
        const storageObject = resp.val() as object;
        for await (const id of Object.keys(storageObject))
        {   
            const resp = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
            if (resp.ok) {
                const json = await resp.json();
                json.hasBookmarked=true;
                jokes.push(json)
            }
        }
        return { myJokes: jokes}

    }
}