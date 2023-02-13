import { db } from "$lib/firebase";
import {ref, set} from "firebase/database"

export async function saveJoke(id:number,userId:string){
    const resp = await set(ref(db,userId+"/"+id),{id:id})
}  