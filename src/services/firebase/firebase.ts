import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import store from '@/store';
import { setError, setSuccess } from '@/store/slices/messageSlice';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    store.dispatch(setSuccess('login'));
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      console.log(err);
      store.dispatch(setError(err.code));
    } else {
      console.error(err);
    }
  }
};

export const registerEmail = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    store.dispatch(setSuccess('registration'));
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      store.dispatch(setError(err.code));
    } else {
      console.error(err);
    }
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    store.dispatch(setSuccess('reset'));
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      store.dispatch(setError(err.code));
    } else {
      console.error(err);
    }
  }
};

export const logout = () => {
  signOut(auth);
};
