import type { JokeModel } from "$lib/logic/JokeModel";
import { writable } from "svelte/store";

export const myJokesStore = writable(<JokeModel[]>[])