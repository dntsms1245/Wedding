import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCgCi12iFsXI66YxRYX9NVGmVHVWyukYOU",
  authDomain: "wedding-guestbook-aa1a8.firebaseapp.com",
  projectId: "wedding-guestbook-aa1a8",
  storageBucket: "wedding-guestbook-aa1a8.firebasestorage.app",
  messagingSenderId: "134235611501",
  appId: "1:134235611501:web:b670fde5e83e0516a53a64"
};


// Firebase 시작
const app = initializeApp(firebaseConfig);

// Firestore 연결
const db = getFirestore(app);
