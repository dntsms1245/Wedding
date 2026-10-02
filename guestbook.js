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




// 방명록 목록 불러오기
const guestbookList = document.getElementById("guestbookList");

const guestbookQuery = query(
  collection(db, "guestbook"),
  orderBy("createdAt", "desc")
);

onSnapshot(guestbookQuery, function(snapshot) {

  guestbookList.innerHTML = "";

  if (snapshot.empty) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "첫 축하 메시지를 남겨주세요. 🤍";
    guestbookList.appendChild(emptyMessage);
    return;
  }

  snapshot.forEach(function(doc) {

    const data = doc.data();

    const item = document.createElement("div");
    item.className = "guestbook-item";

    const name = document.createElement("p");
    name.className = "guestbook-item-name";
    name.textContent = data.name;

    const message = document.createElement("p");
    message.className = "guestbook-item-message";
    message.textContent = data.message;

    message.addEventListener("click", function() {
    message.classList.toggle("expanded");
    });


    const date = document.createElement("p");
    date.className = "guestbook-item-date";

    if (data.createdAt) {
      const createdDate = data.createdAt.toDate();

      date.textContent =
        createdDate.getFullYear() + "." +
        String(createdDate.getMonth() + 1).padStart(2, "0") + "." +
        String(createdDate.getDate()).padStart(2, "0");
    } else {
      date.textContent = "방금";
    }

    item.appendChild(name);
    item.appendChild(message);
    item.appendChild(date);

    guestbookList.appendChild(item);
  });
});
