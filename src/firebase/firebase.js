// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from '@/firebase/firebaseConfig.js'

// Inicializacion firebase
export const appInitFirebase = initializeApp(firebaseConfig)

// Inicializacion baseDeDatos

export const db = getFirestore(appInitFirebase)