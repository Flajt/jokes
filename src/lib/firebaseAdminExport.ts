import * as admin from "firebase-admin";
const {apps} = admin;
import { env } from '$env/dynamic/private';
import {cert,initializeApp} from "firebase-admin/app";
import { FirebaseAdmin } from "./logic/firebaseAdmin";
const adminApp = initializeApp({credential:cert(JSON.parse(env.FIREBASE_STRING)),databaseURL:"https://joker-f6c88-default-rtdb.firebaseio.com/"});

export const adminWrapper = new FirebaseAdmin(adminApp);
