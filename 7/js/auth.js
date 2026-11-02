import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updatePassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";


const loginForm =
    document.getElementById("login-form");

const signupForm =
    document.getElementById("signup-form");

const passwordForm =
    document.getElementById("password-form");

const googleLoginButton =
    document.getElementById("google-login-button");

const logoutButton =
    document.getElementById("logout-button");

const loggedOutAccount =
    document.getElementById("logged-out-account");

const loggedInAccount =
    document.getElementById("logged-in-account");

const userEmail =
    document.getElementById("user-email");

const authMessage =
    document.getElementById("auth-message");

const passwordSection =
    document.getElementById("password-section");

const googlePasswordSection =
    document.getElementById(
        "google-password-section"
    );


function showMessage(message, isError) {
    authMessage.textContent = message;

    authMessage.classList.remove(
        "success-message",
        "error-message"
    );

    if (isError) {
        authMessage.classList.add(
            "error-message"
        );
    } else {
        authMessage.classList.add(
            "success-message"
        );
    }
}


function getErrorMessage(error) {

    if (error.code === "auth/invalid-credential") {
        return "The email or password is incorrect.";
    }

    if (error.code === "auth/email-already-in-use") {
        return "An account already exists with this email.";
    }

    if (error.code === "auth/invalid-email") {
        return "Please enter a valid email address.";
    }

    if (error.code === "auth/weak-password") {
        return "Your password must be at least 6 characters.";
    }

    if (error.code === "auth/popup-closed-by-user") {
        return "Google sign-in was canceled.";
    }

    if (error.code === "auth/requires-recent-login") {
        return "Please log out and log back in before changing your password.";
    }

    return error.message;
}


// Logs in an existing user.
loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "login-email"
            ).value.trim();

        const password =
            document.getElementById(
                "login-password"
            ).value;

        showMessage(
            "Logging in...",
            false
        );

        signInWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then(function() {

                loginForm.reset();

                showMessage(
                    "Login successful.",
                    false
                );

            })

            .catch(function(error) {

                showMessage(
                    getErrorMessage(error),
                    true
                );

            });
    }
);


// Creates a new account.
signupForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "signup-email"
            ).value.trim();

        const password =
            document.getElementById(
                "signup-password"
            ).value;

        const confirmPassword =
            document.getElementById(
                "signup-confirm-password"
            ).value;

        if (password !== confirmPassword) {

            showMessage(
                "The passwords do not match.",
                true
            );

            return;
        }

        showMessage(
            "Creating your account...",
            false
        );

        createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then(function() {

                signupForm.reset();

                showMessage(
                    "Account created successfully.",
                    false
                );

            })

            .catch(function(error) {

                showMessage(
                    getErrorMessage(error),
                    true
                );

            });
    }
);


// Signs in with Google.
googleLoginButton.addEventListener(
    "click",
    function() {

        const provider =
            new GoogleAuthProvider();

        showMessage(
            "Opening Google sign-in...",
            false
        );

        signInWithPopup(
            auth,
            provider
        )
            .then(function() {

                showMessage(
                    "Google sign-in successful.",
                    false
                );

            })

            .catch(function(error) {

                showMessage(
                    getErrorMessage(error),
                    true
                );

            });
    }
);


// Changes the password for email accounts.
passwordForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const newPassword =
            document.getElementById(
                "new-password"
            ).value;

        const confirmNewPassword =
            document.getElementById(
                "confirm-new-password"
            ).value;

        if (
            newPassword !==
            confirmNewPassword
        ) {

            showMessage(
                "The new passwords do not match.",
                true
            );

            return;
        }

        if (!auth.currentUser) {

            showMessage(
                "You must be logged in to change your password.",
                true
            );

            return;
        }

        showMessage(
            "Changing password...",
            false
        );

        updatePassword(
            auth.currentUser,
            newPassword
        )
            .then(function() {

                passwordForm.reset();

                showMessage(
                    "Password changed successfully.",
                    false
                );

            })

            .catch(function(error) {

                showMessage(
                    getErrorMessage(error),
                    true
                );

            });
    }
);


// Logs the current user out.
logoutButton.addEventListener(
    "click",
    function() {

        showMessage(
            "Logging out...",
            false
        );

        signOut(auth)
            .then(function() {

                showMessage(
                    "You have been logged out.",
                    false
                );

            })

            .catch(function(error) {

                showMessage(
                    getErrorMessage(error),
                    true
                );

            });
    }
);


// Updates the page when authentication changes.
onAuthStateChanged(
    auth,
    function(user) {

        if (user) {

            loggedOutAccount.hidden = true;
            loggedInAccount.hidden = false;

            userEmail.textContent =
                user.email || "Google User";

            const usesPassword =
                user.providerData.some(
                    function(provider) {

                        return (
                            provider.providerId ===
                            "password"
                        );

                    }
                );

            const usesGoogle =
                user.providerData.some(
                    function(provider) {

                        return (
                            provider.providerId ===
                            "google.com"
                        );

                    }
                );

            passwordSection.hidden =
                !usesPassword;

            googlePasswordSection.hidden =
                !usesGoogle;

        } else {

            loggedOutAccount.hidden = false;
            loggedInAccount.hidden = true;

            userEmail.textContent = "";

            passwordSection.hidden = false;

            googlePasswordSection.hidden = true;
        }
    }
);
