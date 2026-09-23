import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { FormData } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyAag3uG8gI9Rx0lAOLSpR4Rstv2TxCZD7Y",
  authDomain: "network-7b473.firebaseapp.com",
  projectId: "network-7b473",
  storageBucket: "network-7b473.firebasestorage.app",
  messagingSenderId: "403562060250",
  appId: "1:403562060250:web:d8af2942fd8d95c24608e3",
  measurementId: "G-53NE925TY2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics conditionally (only in supported browser environments)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

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

export interface ApplicationRecord extends FormData {
  id: string;
  createdAt?: any;
  submittedAt?: string;
}

export async function getApplications(): Promise<ApplicationRecord[]> {
  try {
    const q = query(collection(db, 'network_applications'), orderBy('submittedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as FormData),
      submittedAt: docSnap.data().submittedAt || '',
    }));
  } catch (error) {
    // If order index is missing, fallback to unordered getDocs
    console.warn('Fallback fetching without order:', error);
    const snapshot = await getDocs(collection(db, 'network_applications'));
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as FormData),
      submittedAt: docSnap.data().submittedAt || '',
    }));
  }
}

export async function deleteApplication(id: string) {
  const docRef = doc(db, 'network_applications', id);
  await deleteDoc(docRef);
  return true;
}


