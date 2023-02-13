import { JokeModel } from "./JokeModel";

export async function getJokes():Promise<JokeModel[]>{
    const resp = await fetch("https://v2.jokeapi.dev/joke/Any?amount=10");
    const jokes:JokeModel[] = []
    if(resp.ok){
        const json = await  resp.json();
        if(json["error"]==false){
            json["jokes"].forEach((element: any) => {
                jokes.push(new JokeModel(element))
            });
        }
    }
    return jokes;
}