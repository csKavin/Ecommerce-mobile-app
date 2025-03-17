import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPG3ktuMgOq89fI6JX46SonSLo_OfmsSc",
  authDomain: "liza-b1ea7.firebaseapp.com",
  projectId: "liza-b1ea7",
  storageBucket: "liza-b1ea7.firebasestorage.app",
  messagingSenderId: "257549867089",
  appId: "1:257549867089:web:05588701b5ccb79527c070",
  measurementId: "G-2KEHGC4M53",
};

const app = initializeApp(firebaseConfig);
export const storageBucket = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const collections = {
  ORDERS: "orders",
  PRODUCTS: "products",
  USERS: "users",
  PAYMENT: "payments",
  TYPES: "types",
};

export const roles = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

export const cart_status = {
  ADDED: "INCART",
  ORDERED: "ORDERED",
  PROCESS: "PROCESS",
  DELIVERED: "DELIVERED",
};

export const payment_status = {
  SUCCESS: "Success",
  INITIATED: "Initiated",
};
