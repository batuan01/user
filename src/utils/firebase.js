import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsj8iqtFA93fItNMscYlbmrFaiMaC8CiE",
  authDomain: "kenta-71006.firebaseapp.com",
  projectId: "kenta-71006",
  storageBucket: "kenta-71006.appspot.com",
  messagingSenderId: "333405733899",
  appId: "1:333405733899:web:2fb5b5f40a924e1d4c330e",
  measurementId: "G-BQL9W662XR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const ConvertFirebase = ({ images }) => {
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  const handleUpload = async () => {
    const urls = [];

    // Duyệt qua mảng ảnh và tải lên mỗi ảnh
    for (const image of images) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // Lấy đường dẫn đến ảnh đã tải lên
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  };
  return handleUpload();
};

export const handleGoogleSignUp = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    // const userCredential = await signInWithPopup(auth, provider);
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
