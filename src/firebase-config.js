import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAh5jmsIcm4ht4hMnh3BDnxkPtB5T4PBJ8",
  authDomain: "ess-700a8.firebaseapp.com",
  projectId: "ess-700a8",
  storageBucket: "ess-700a8.firebasestorage.app",
  messagingSenderId: "785965095537",
  appId: "1:785965095537:web:1a7fae17fc2193fb9859d0",
  measurementId: "G-7FM27VMLT9"
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
