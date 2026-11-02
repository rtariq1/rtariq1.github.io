import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


// Checks whether the user is logged in.
onAuthStateChanged(auth, function(user) {

    if (!user) {
        window.location.replace("index.html#login-signup");
    }

});
