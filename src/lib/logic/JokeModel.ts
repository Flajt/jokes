export class JokeModel {
    category?: string;
    setup?: string;
    delivery?: string;
    type: JokeType;
    joke:string;
    flags: JokeFlags;
    id:number;
    safe:boolean;
    lang:string;
    hasBookmarked:boolean;
    constructor(json:object | any){
        this.category = json["category"],
        this.setup = json["setup"],
        this.delivery = json["delivery"],
        this.type = json["type"]=="single"? JokeType.single : JokeType.twoPart,
        this.joke = json["joke"],
        this.flags = json["flags"] as JokeFlags,
        this.id = json["id"],
        this.safe = json["safe"],
        this.lang = json["lang"]
        this.hasBookmarked = json["hasBookmarked"];
    };

}
export enum JokeType {
    single,
    twoPart
}

export type JokeFlags = {
    nsfw: boolean,
    relegious: boolean,
    political: boolean,
    racist: boolean,
    sexist: boolean,
    explicit: boolean
}