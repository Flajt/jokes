import { db } from "$lib/firebase";
import { ref, remove } from "firebase/database";
import { getMyJokes } from "./getMyJokes";

export async function deleteJoke(userid:string,jokeId:number){
    const jokes = await getMyJokes(userid);
    remove(ref(db,`${userid}/${jokeId}`))

}