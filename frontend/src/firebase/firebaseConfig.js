import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQYTnmsGQbvI21KAzeONLslotBidk01hI",
  authDomain: "moodz-f2ac6.firebaseapp.com",
  projectId: "moodz-f2ac6",
  storageBucket: "moodz-f2ac6.firebasestorage.app",
  messagingSenderId: "347260455889",
  appId: "1:347260455889:web:0ac8b83a064cf1b287eef0",
  measurementId: "G-K4BRYS8MDK"
};




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
