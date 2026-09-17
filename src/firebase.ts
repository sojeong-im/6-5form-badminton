import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { FormData } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyBr_5Nhrg17gZCSujlBaMwRIAGzRjwZeZo",
  authDomain: "complete-e5d4f.firebaseapp.com",
  projectId: "complete-e5d4f",
  storageBucket: "complete-e5d4f.firebasestorage.app",
  messagingSenderId: "218483261185",
  appId: "1:218483261185:web:432c86e07bbb624382e500",
  measurementId: "G-5MSPDNKE0Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function submitApplication(data: FormData) {
  try {
    const docRef = await addDoc(collection(db, 'network_applications'), {
      ...data,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Firebase submission error:', error);
    throw error;
  }
}
