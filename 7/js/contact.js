import { db, auth } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


const contactForm =
    document.getElementById("contact-form");

const contactStatus =
    document.getElementById("contact-status");

const submitButton =
    document.getElementById("contact-submit");


function showContactStatus(message, isError) {

    contactStatus.textContent = message;

    contactStatus.classList.remove(
        "success-message",
        "error-message"
    );

    if (isError) {
        contactStatus.classList.add(
            "error-message"
        );
    } else {
        contactStatus.classList.add(
            "success-message"
        );
    }
}


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!auth.currentUser) {

            showContactStatus(
                "You must be logged in to send a message.",
                true
            );

            return;
        }


        const name =
            document.getElementById("name")
                .value.trim();

        const email =
            document.getElementById("email")
                .value.trim();

        const country =
            document.getElementById("country")
                .value;

        const club =
            document.getElementById("club")
                .value.trim();

        const message =
            document.getElementById("message")
                .value.trim();


        if (!name || !email || !message) {

            showContactStatus(
                "Please complete all required fields.",
                true
            );

            return;
        }


        submitButton.disabled = true;

        submitButton.textContent =
            "Sending...";

        showContactStatus(
            "Sending your message...",
            false
        );


        addDoc(
            collection(
                db,
                "contactMessages"
            ),
            {
                name: name,
                email: email,
                favoriteCountry: country,
                favoriteClub: club,
                message: message,
                userId: auth.currentUser.uid,
                submittedAt: serverTimestamp()
            }
        )

            .then(function() {

                contactForm.reset();

                showContactStatus(
                    "Your message was successfully submitted.",
                    false
                );

            })

            .catch(function(error) {

                console.error(
                    "Contact form error:",
                    error
                );

                showContactStatus(
                    "Your message could not be submitted. Please try again.",
                    true
                );

            })

            .finally(function() {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Message";

            });
    }
);
