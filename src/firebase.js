// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// const API_KEY = process.env.REACT_APP_FIREBASE_KEY
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: "chat-engine-8dbde.firebaseapp.com",
//   projectId: "chat-engine-8dbde",
//   storageBucket: "chat-engine-8dbde.appspot.com",
//   messagingSenderId: "654735497077",
//   appId: "1:654735497077:web:e95d3917f9a3035db5653c",
//   measurementId: "G-2355KSKVN7"
// };
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage();
// export const db = getFirestore()






















import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Import Firebase Messaging
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyAhRXYsuWV9ga06Clz3fyadnCApOwuerWk",
  authDomain: "chat-engine-8dbde.firebaseapp.com",
  projectId: "chat-engine-8dbde",
  storageBucket: "chat-engine-8dbde.appspot.com",
  messagingSenderId: "654735497077",
  appId: "1:654735497077:web:e95d3917f9a3035db5653c",
  measurementId: "G-2355KSKVN7"
};
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};
requestNotificationPermission();
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// Initialize Firebase Messaging
const messaging = getMessaging();

// Request permission to receive notifications


// Get the FCM token for the user
const getFCMToken = async () => {
  try {
    const token = await getToken(messaging);
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Handle incoming notifications
const handleNotifications = () => {
  onMessage(messaging, (payload) => {
    console.log("Received a notification:", payload);
    // You can customize how to handle the incoming notification here
    // For example, display a notification to the user
    const { title, body } = payload.notification;
    new Notification(title, { body });
  });
};

// Component to initialize notification setup
const FirebaseNotificationSetup = () => {
  useEffect(() => {
    requestNotificationPermission();
    getFCMToken();
    handleNotifications();
  }, []);

  return null;
};

export default FirebaseNotificationSetup;
