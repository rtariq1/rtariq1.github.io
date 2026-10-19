// Stores the soccer data after it is loaded.
let soccerData = null;


// Gets the HTML elements that JavaScript will change.
const exploreContent = document.getElementById("explore-content");
const exploreTitle = document.getElementById("explore-title");
const exploreDescription = document.getElementById("explore-description");
const stepLabel = document.getElementById("step-label");
const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");


// Adds one item to a list.
function addListItem(list, text) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    list.appendChild(listItem);
}


// Adds a paragraph to an element.
function addParagraph(container, text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    container.appendChild(paragraph);
}


// Creates one club fact.
function addFact(container, label, value) {
    const fact = document.createElement("div");
    fact.classList.add("club-fact");

    const factLabel = document.createElement("strong");
    factLabel.textContent = label;

    const factValue = document.createElement("span");
    factValue.textContent = value;

    fact.appendChild(factLabel);
    fact.appendChild(factValue);

    container.appendChild(fact);
}


// Creates an information section.
function createInfoSection(title) {
    const section = document.createElement("section");
    section.classList.add("club-info-block");

    const heading = document.createElement("h2");
    heading.textContent = title;

    section.appendChild(heading);

    return section;
}


// Moves the page back to the top.
function moveToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Displays an error if the JSON cannot be loaded.
function displayError() {
    exploreContent.innerHTML = "";

    exploreTitle.textContent = "Soccer Data Error";
    exploreDescription.textContent =
        "There was a problem loading the soccer information.";

    stepLabel.textContent = "Error";

    backButton.hidden = true;
    restartButton.hidden = true;

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


// Displays all information for the selected club.
function displayClubInformation(club, country) {
    exploreTitle.textContent = club.name;

    exploreDescription.textContent =
        "Discover the history, stadium, legendary players, major trophies, records, and interesting facts about " +
        club.name +
        ".";

    stepLabel.textContent = club.country;

    backButton.hidden = false;
    restartButton.hidden = false;

    exploreContent.innerHTML = "";

    const clubArticle = document.createElement("article");
    clubArticle.classList.add("club-profile");


    // Introduction

    const introductionSection = document.createElement("section");
    introductionSection.classList.add("club-story");

    const introductionText = document.createElement("div");
    introductionText.classList.add("club-story-text");

    const introductionLabel = document.createElement("p");
    introductionLabel.classList.add("eyebrow");
    introductionLabel.textContent = "Introduction";

    const introductionHeading = document.createElement("h2");
    introductionHeading.textContent = club.name;

    introductionText.appendChild(introductionLabel);
    introductionText.appendChild(introductionHeading);

    club.introduction.forEach(function(paragraph) {
        addParagraph(introductionText, paragraph);
    });

    const stadiumImage = document.createElement("img");
    stadiumImage.classList.add("club-story-image");
    stadiumImage.src = club.stadiumImage;
    stadiumImage.alt =
        club.stadium + ", home stadium of " + club.name;

    introductionSection.appendChild(introductionText);
    introductionSection.appendChild(stadiumImage);

    clubArticle.appendChild(introductionSection);


    // About the club

    const aboutSection = document.createElement("section");
    aboutSection.classList.add("club-story", "reverse");

    const aboutText = document.createElement("div");
    aboutText.classList.add("club-story-text");

    const aboutLabel = document.createElement("p");
    aboutLabel.classList.add("eyebrow");
    aboutLabel.textContent = "About the Club";

    const aboutHeading = document.createElement("h2");
    aboutHeading.textContent = "Club History";

    aboutText.appendChild(aboutLabel);
    aboutText.appendChild(aboutHeading);

    club.about.forEach(function(paragraph) {
        addParagraph(aboutText, paragraph);
    });

    const teamImage = document.createElement("img");
    teamImage.classList.add("club-story-image");
    teamImage.src = club.teamImage;
    teamImage.alt = club.name + " team";

    aboutSection.appendChild(aboutText);
    aboutSection.appendChild(teamImage);

    clubArticle.appendChild(aboutSection);


    // Club information

    const factsSection = document.createElement("section");
    factsSection.classList.add("club-facts-section");

    const factsHeading = document.createElement("h2");
    factsHeading.textContent = "Club Information";

    const factsGrid = document.createElement("div");
    factsGrid.classList.add("club-facts-grid");

    addFact(factsGrid, "Country", club.country);
    addFact(factsGrid, "City", club.city);
    addFact(factsGrid, "Founded", club.founded);
    addFact(factsGrid, "Stadium", club.stadium);
    addFact(factsGrid, "Colors", club.colors);

    factsSection.appendChild(factsHeading);
    factsSection.appendChild(factsGrid);

    clubArticle.appendChild(factsSection);


    // Top scorer

    const scorerSection = createInfoSection(
        "All-Time Top Scorer"
    );

    const scorerName = document.createElement("h3");
    scorerName.textContent = club.topScorer.name;

    const scorerGoals = document.createElement("p");

    if (typeof club.topScorer.goals === "number") {
        scorerGoals.textContent =
            club.topScorer.goals + " goals";
    } else {
        scorerGoals.textContent =
            club.topScorer.goals;
    }

    scorerSection.appendChild(scorerName);
    scorerSection.appendChild(scorerGoals);

    clubArticle.appendChild(scorerSection);


    // Major trophies

    const trophiesSection = createInfoSection(
        "Major Trophies"
    );

    const trophiesList = document.createElement("ul");

    club.trophies.forEach(function(trophy) {
        addListItem(trophiesList, trophy);
    });

    trophiesSection.appendChild(trophiesList);

    clubArticle.appendChild(trophiesSection);


    // Ballon d'Or history

    const ballonDorSection = createInfoSection(
        "Ballon d'Or History"
    );

    const ballonDorList = document.createElement("ul");

    club.ballonDor.forEach(function(item) {
        addListItem(ballonDorList, item);
    });

    ballonDorSection.appendChild(ballonDorList);

    clubArticle.appendChild(ballonDorSection);


    // Fun facts

    const funFactsSection = createInfoSection(
        "Fun Facts"
    );

    const funFactsList = document.createElement("ul");

    club.funFacts.forEach(function(fact) {
        addListItem(funFactsList, fact);
    });

    funFactsSection.appendChild(funFactsList);

    clubArticle.appendChild(funFactsSection);


    exploreContent.appendChild(clubArticle);


    // Navigation

    backButton.onclick = function() {
        displayClubs(country);
    };

    restartButton.onclick = function() {
        displayCountries();
    };

    moveToTop();
}


// Displays the clubs for the selected country.
function displayClubs(country) {
    exploreTitle.textContent =
        "Choose a " + country.name + " Club";

    exploreDescription.textContent =
        "You selected " +
        country.name +
        ". Choose one of the four clubs below to learn about its history, stadium, club information, and major achievements.";

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
        clubImage.src = club.badge;
        clubImage.alt = club.name + " badge";

        const clubName = document.createElement("h2");
        clubName.textContent = club.name;

        const clubCity = document.createElement("p");
        clubCity.textContent =
            club.city + ", " + club.country;

        const viewText = document.createElement("span");
        viewText.classList.add("club-view-text");
        viewText.textContent = "View Club →";

        clubButton.appendChild(clubImage);
        clubButton.appendChild(clubName);
        clubButton.appendChild(clubCity);
        clubButton.appendChild(viewText);

        clubButton.addEventListener("click", function() {
            displayClubInformation(club, country);
        });

        clubGrid.appendChild(clubButton);
    });

    exploreContent.appendChild(clubGrid);

    backButton.onclick = function() {
        displayCountries();
    };

    moveToTop();
}


// Displays the countries.
function displayCountries() {
    exploreTitle.textContent = "Choose a Country";

    exploreDescription.textContent =
        "Start exploring European soccer by choosing a country. Your selection will show you four clubs from that country.";

    stepLabel.textContent = "Step 1 of 2";

    backButton.hidden = true;
    restartButton.hidden = true;

    exploreContent.innerHTML = "";

    const countryGrid = document.createElement("div");
    countryGrid.classList.add("country-grid");

    soccerData.countries.forEach(function(country) {
        const countryButton =
            document.createElement("button");

        countryButton.type = "button";
        countryButton.classList.add("country-card");

        countryButton.setAttribute(
            "aria-label",
            "Explore soccer clubs from " + country.name
        );

        countryButton.style.backgroundImage =
            "linear-gradient(" +
            "rgba(0, 0, 0, 0.45), " +
            "rgba(0, 0, 0, 0.45)" +
            "), url('" +
            country.flag +
            "')";

        const countryName =
            document.createElement("span");

        countryName.classList.add("country-name");
        countryName.textContent = country.name;

        const countryDescription =
            document.createElement("span");

        countryDescription.classList.add(
            "country-description"
        );

        countryDescription.textContent =
            country.description;

        const exploreText =
            document.createElement("span");

        exploreText.classList.add("country-view-text");

        exploreText.textContent =
            "Explore " + country.name + " →";

        countryButton.appendChild(countryName);
        countryButton.appendChild(countryDescription);
        countryButton.appendChild(exploreText);

        countryButton.addEventListener(
            "click",
            function() {
                displayClubs(country);
            }
        );

        countryGrid.appendChild(countryButton);
    });

    exploreContent.appendChild(countryGrid);

    moveToTop();
}


// Loads the soccer information from the JSON file.
function loadSoccerData() {
    fetch("data/clubs.json")
        .then(function(response) {
            if (!response.ok) {
                throw new Error(
                    "The soccer data could not be loaded."
                );
            }

            return response.json();
        })
        .then(function(data) {
            soccerData = data;
            displayCountries();
        })
        .catch(function() {
            displayError();
        });
}


// Starts the application.
loadSoccerData();
