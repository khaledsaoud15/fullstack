import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXsdDY2zVuhUY5ySbkcbtZhaDH6GKLMnE",
  authDomain: "fullstack-bec4a.firebaseapp.com",
  projectId: "fullstack-bec4a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
