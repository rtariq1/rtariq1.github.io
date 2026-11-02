import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


// Checks the user's login status before allowing access.
onAuthStateChanged(auth, function(user) {

    if (user) {
        console.log("User is logged in.");
    } else {
        window.location.href = "login.html";
    }

});
