import { getJokes } from "$lib/logic/getJokes";

import type {PageLoad} from "./$types";
export const load =  (async ({ params }) => {
   const jokes = await getJokes();
   return {jokes:jokes}
}) satisfies PageLoad;