  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-analytics.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAiXEkhi8q4GAmLnb4HBDOkK8QU3sN8PXQ",
    authDomain: "fundacion-santa-rosa-fdffb.firebaseapp.com",
    projectId: "fundacion-santa-rosa-fdffb",
    storageBucket: "fundacion-santa-rosa-fdffb.firebasestorage.app",
    messagingSenderId: "556864005028",
    appId: "1:556864005028:web:42b9e9ff8c252cb577d731",
    measurementId: "G-K7HP1CQXF7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

export {
    app,
    analytics,
    database
};