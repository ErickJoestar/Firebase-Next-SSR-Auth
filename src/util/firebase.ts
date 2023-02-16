import { FirebaseOptions, initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

// ********************************************************************************
const config: FirebaseOptions = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,

  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};


// Initialize Firebase
export const app = getApps().length > 0 ? getApps()[0/*use first App*/]: initializeApp(config);
export const auth = getAuth();

export const signInWithGoogleRedirect = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return await signInWithRedirect(auth, googleAuthProvider);
}

export const logout = async () => {
  return await auth.signOut();
}