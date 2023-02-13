import * as admin from "firebase-admin";
const {apps,app} = admin;
import { env } from '$env/dynamic/private';
import {cert,initializeApp} from "firebase-admin/app";
export const adminApp = apps??[].length === 0 ? initializeApp({credential:cert(JSON.parse(env.FIREBASE_STRING)),databaseURL:"https://joker-f6c88-default-rtdb.firebaseio.com/"}) : app();
