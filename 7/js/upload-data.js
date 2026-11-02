import { db } from "./firebase-config.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


const uploadButton =
    document.getElementById("upload-button");

const uploadStatus =
    document.getElementById("upload-status");


// Uploads the Project 4 soccer data to Firestore.
function uploadSoccerData() {
    uploadButton.disabled = true;

    uploadStatus.textContent =
        "Uploading soccer data to Firestore...";

    fetch("data/clubs.json")
        .then(function(response) {
            if (!response.ok) {
                throw new Error(
                    "Could not load the soccer data."
                );
            }

            return response.json();
        })

        .then(function(data) {
            const soccerDocument =
                doc(db, "soccerData", "main");

            return setDoc(
                soccerDocument,
                data
            );
        })

        .then(function() {
            uploadStatus.textContent =
                "Success! All soccer data was uploaded to Firestore.";
        })

        .catch(function(error) {
            uploadStatus.textContent =
                "Upload failed: " + error.message;

            uploadButton.disabled = false;
        });
}


uploadButton.addEventListener(
    "click",
    uploadSoccerData
);
