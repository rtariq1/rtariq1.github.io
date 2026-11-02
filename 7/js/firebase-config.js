import { initializeApp } from
    "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


// Firebase configuration for Soccer Explorer.
const firebaseConfig = {
    apiKey: "AIzaSyCuyGF0zSMilLW0VhLtqlAd8KdZezSRzt8",
    authDomain: "csci-3054-website.firebaseapp.com",
    projectId: "csci-3054-website",
    storageBucket: "csci-3054-website.firebasestorage.app",
    messagingSenderId: "199495886991",
    appId: "1:199495886991:web:82925160d98e38ef4968fa"
};


// Starts Firebase.
const app = initializeApp(firebaseConfig);


// Gives the other JavaScript files access to Firebase.
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };