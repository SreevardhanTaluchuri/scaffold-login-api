import admin from "firebase-admin";
import key from "./firebase-key.json";

const firebase_key = key as admin.ServiceAccount;

admin.initializeApp({
 credential: admin.credential.cert(firebase_key),
});

export default admin;
