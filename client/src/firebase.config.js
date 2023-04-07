import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQuYnoW-oMk3iqS23GovFropwGvvxwLHo",
    authDomain: "furniture-200c1.firebaseapp.com",
    projectId: "furniture-200c1",
    storageBucket: "furniture-200c1.appspot.com",
    messagingSenderId: "432268930289",
    appId: "1:432268930289:web:6e66f79ed87b1d96b00d50"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;