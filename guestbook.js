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



// 입력창과 버튼 찾기
const guestNameInput = document.getElementById("guestName");
const guestMessageInput = document.getElementById("guestMessage");
const guestSubmitButton = document.getElementById("guestSubmitButton");


// 마음 남기기 버튼 클릭
guestSubmitButton.addEventListener("click", async function() {

  const name = guestNameInput.value.trim();
  const message = guestMessageInput.value.trim();

  // 이름 또는 메시지가 비어 있으면 중단
  if (name === "" || message === "") {
    alert("이름과 축하 메시지를 모두 입력해주세요.");
    return;
  }

  // 중복 클릭 방지
  guestSubmitButton.disabled = true;
  guestSubmitButton.textContent = "등록 중...";

  try {

    await addDoc(collection(db, "guestbook"), {
      name: name,
      message: message,
      createdAt: serverTimestamp()
    });

    alert("축하 메시지가 등록되었습니다. 🤍");

    // 입력창 비우기
    guestNameInput.value = "";
    guestMessageInput.value = "";

  } catch (error) {

    console.error("방명록 등록 오류:", error);
    alert("메시지 등록 중 오류가 발생했습니다.");

  } finally {

    guestSubmitButton.disabled = false;
    guestSubmitButton.textContent = "마음 남기기";
  }
});
