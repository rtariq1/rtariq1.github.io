// Stores the soccer data after it is loaded from the JSON file.
let soccerData = null;

// Gets the main HTML elements that JavaScript will change.
const exploreContent = document.getElementById("explore-content");
const exploreTitle = document.getElementById("explore-title");
const exploreDescription = document.getElementById("explore-description");
const stepLabel = document.getElementById("step-label");
const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");


// Loads the soccer information from the external JSON file.
function loadSoccerData() {
    fetch("data/clubs.json")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("The soccer data could not be loaded.");
            }

            return response.json();
        })
        .then(function(data) {
            soccerData = data;
            displayCountries();
        })
        .catch(function(error) {
            displayError(error);
        });
}


// Displays the four countries on the first step.
function displayCountries() {
    exploreTitle.textContent = "Choose a Country";
    exploreDescription.textContent =
        "Start exploring European soccer by choosing a country.";
    stepLabel.textContent = "Step 1 of 2";

    backButton.hidden = true;
    restartButton.hidden = true;

    exploreContent.innerHTML = "";

    const countryGrid = document.createElement("div");
    countryGrid.classList.add("country-grid");

    soccerData.countries.forEach(function(country) {
        const countryButton = document.createElement("button");

        countryButton.type = "button";
        countryButton.classList.add("country-card");
        countryButton.setAttribute(
            "aria-label",
            "Explore soccer clubs from " + country.name
        );

        countryButton.style.backgroundImage =
            "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('" +
            country.flag +
            "')";

        const countryName = document.createElement("span");
        countryName.classList.add("country-name");
        countryName.textContent = country.name;

        const countryDescription = document.createElement("span");
        countryDescription.classList.add("country-description");
        countryDescription.textContent = country.description;

        countryButton.appendChild(countryName);
        countryButton.appendChild(countryDescription);

        countryButton.addEventListener("click", function() {
            displayClubs(country);
        });

        countryGrid.appendChild(countryButton);
    });

    exploreContent.appendChild(countryGrid);
}


// Displays the four clubs for the selected country.
function displayClubs(country) {
    exploreTitle.textContent = country.name + " Clubs";
    exploreDescription.textContent =
        "Choose a club to learn more about its history and achievements.";
    stepLabel.textContent = "Step 2 of 2";

    backButton.hidden = false;
    restartButton.hidden = true;

    exploreContent.innerHTML = "";

    const clubGrid = document.createElement("div");
    clubGrid.classList.add("club-grid");

    country.clubs.forEach(function(club) {
        const clubButton = document.createElement("button");

        clubButton.type = "button";
        clubButton.classList.add("club-card");

        clubButton.setAttribute(
            "aria-label",
            "View information about " + club.name
        );

        const clubImage = document.createElement("img");
        clubImage.src = club.teamImage;
        clubImage.alt = club.name + " team";

        const clubName = document.createElement("h2");
        clubName.textContent = club.name;

        const clubCity = document.createElement("p");
        clubCity.textContent = club.city + ", " + club.country;

        clubButton.appendChild(clubImage);
        clubButton.appendChild(clubName);
        clubButton.appendChild(clubCity);

        clubButton.addEventListener("click", function() {
            displayClubInformation(club, country);
        });

        clubGrid.appendChild(clubButton);
    });

    exploreContent.appendChild(clubGrid);

    backButton.onclick = function() {
        displayCountries();
    };
}


// Displays all information for the selected club.
function displayClubInformation(club, country) {
    exploreTitle.textContent = club.name;
    exploreDescription.textContent =
        club.city + ", " + club.country;
    stepLabel.textContent = "Club Information";

    backButton.hidden = false;
    restartButton.hidden = false;

    exploreContent.innerHTML = "";

    const clubArticle = document.createElement("article");
    clubArticle.classList.add("club-details");


    const stadiumImage = document.createElement("img");
    stadiumImage.classList.add("club-detail-image");
    stadiumImage.src = club.stadiumImage;
    stadiumImage.alt = club.stadium + ", home stadium of " + club.name;

    clubArticle.appendChild(stadiumImage);


    const factsSection = createSection("Club Information");

    const factsList = document.createElement("ul");

    addListItem(factsList, "Country: " + club.country);
    addListItem(factsList, "City: " + club.city);
    addListItem(factsList, "Founded: " + club.founded);
    addListItem(factsList, "Stadium: " + club.stadium);
    addListItem(factsList, "Colors: " + club.colors);

    factsSection.appendChild(factsList);
    clubArticle.appendChild(factsSection);


    const introductionSection = createSection("Introduction");

    club.introduction.forEach(function(paragraph) {
        const text = document.createElement("p");
        text.textContent = paragraph;
        introductionSection.appendChild(text);
    });

    clubArticle.appendChild(introductionSection);


    const teamImage = document.createElement("img");
    teamImage.classList.add("club-detail-image");
    teamImage.src = club.teamImage;
    teamImage.alt = club.name + " team";

    clubArticle.appendChild(teamImage);


    const aboutSection = createSection("About the Club");

    club.about.forEach(function(paragraph) {
        const text = document.createElement("p");
        text.textContent = paragraph;
        aboutSection.appendChild(text);
    });

    clubArticle.appendChild(aboutSection);


    const scorerSection = createSection("All-Time Top Scorer");

    const scorerText = document.createElement("p");

    if (typeof club.topScorer.goals === "number") {
        scorerText.textContent =
            club.topScorer.name +
            " - " +
            club.topScorer.goals +
            " goals";
    } else {
        scorerText.textContent =
            club.topScorer.name +
            " - " +
            club.topScorer.goals;
    }

    scorerSection.appendChild(scorerText);
    clubArticle.appendChild(scorerSection);


    const trophiesSection = createSection("Major Trophies");
    const trophyList = document.createElement("ul");

    club.trophies.forEach(function(trophy) {
        addListItem(trophyList, trophy);
    });

    trophiesSection.appendChild(trophyList);
    clubArticle.appendChild(trophiesSection);


    const ballonDorSection = createSection("Ballon d'Or History");
    const ballonDorList = document.createElement("ul");

    club.ballonDor.forEach(function(winner) {
        addListItem(ballonDorList, winner);
    });

    ballonDorSection.appendChild(ballonDorList);
    clubArticle.appendChild(ballonDorSection);


    const funFactsSection = createSection("Fun Facts");
    const funFactsList = document.createElement("ul");

    club.funFacts.forEach(function(fact) {
        addListItem(funFactsList, fact);
    });

    funFactsSection.appendChild(funFactsList);
    clubArticle.appendChild(funFactsSection);


    exploreContent.appendChild(clubArticle);


    backButton.onclick = function() {
        displayClubs(country);
    };

    restartButton.onclick = function() {
        displayCountries();
    };
}


// Creates a section with a heading.
function createSection(title) {
    const section = document.createElement("section");
    section.classList.add("club-info-section");

    const heading = document.createElement("h2");
    heading.textContent = title;

    section.appendChild(heading);

    return section;
}


// Adds one item to a list.
function addListItem(list, text) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    list.appendChild(listItem);
}


// Displays an error if the JSON file cannot be loaded.
function displayError(error) {
    exploreContent.innerHTML = "";

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");

    const errorHeading = document.createElement("h2");
    errorHeading.textContent = "Unable to Load Soccer Data";

    const errorText = document.createElement("p");
    errorText.textContent =
        "The soccer information could not be loaded. Please try again later.";

    errorMessage.appendChild(errorHeading);
    errorMessage.appendChild(errorText);

    exploreContent.appendChild(errorMessage);
}


// Starts the application after the page has loaded.
loadSoccerData();
