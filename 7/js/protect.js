import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


// Protects pages that require the user to be logged in.
onAuthStateChanged(auth, function(user) {

    if (!user) {

        // Sends logged-out users to the login page.
        window.location.replace("login.html");

    }

});
