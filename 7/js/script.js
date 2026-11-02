// Stores the soccer data after it is loaded.
let soccerData = null;

const exploreContent = document.getElementById("explore-content");
const exploreTitle = document.getElementById("explore-title");
const exploreDescription = document.getElementById("explore-description");
const stepLabel = document.getElementById("step-label");
const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");
const navigationHelp = document.getElementById("navigation-help");


// Moves the page back to the top.
function moveToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Adds a paragraph to an element.
function addParagraph(container, text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    container.appendChild(paragraph);
}


// Adds one list item and keeps labels bold.
function addListItem(list, item) {
    const listItem = document.createElement("li");

    if (item.label) {
        const strong = document.createElement("strong");
        strong.textContent = item.label + ":";
        listItem.appendChild(strong);

        listItem.appendChild(
            document.createTextNode(" " + item.value)
        );
    } else {
        listItem.textContent = item.text;
    }

    list.appendChild(listItem);
}


// Creates one story section.
function createStoryRow(label, story, reverse) {
    const row = document.createElement("div");
    row.classList.add("story-row");

    if (reverse) {
        row.classList.add("story-row-reverse");
    }

    const text = document.createElement("div");
    text.classList.add("story-text");

    const eyebrow = document.createElement("p");
    eyebrow.classList.add("eyebrow");
    eyebrow.textContent = label;

    const heading = document.createElement("h2");
    heading.textContent = story.heading;

    text.appendChild(eyebrow);
    text.appendChild(heading);

    story.paragraphs.forEach(function(paragraph) {
        addParagraph(text, paragraph);
    });

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("story-image");

    const image = document.createElement("img");
    image.src = story.image;
    image.alt = story.imageAlt;

    imageContainer.appendChild(image);

    row.appendChild(text);
    row.appendChild(imageContainer);

    return row;
}


// Creates the club information section.
function createFactsSection(club) {
    const section = document.createElement("section");
    section.classList.add("club-information");

    const headingContainer = document.createElement("div");
    headingContainer.classList.add("section-heading");

    const eyebrow = document.createElement("p");
    eyebrow.classList.add("eyebrow");
    eyebrow.textContent = "Club Details";

    const heading = document.createElement("h2");
    heading.textContent = "Club Information";

    headingContainer.appendChild(eyebrow);
    headingContainer.appendChild(heading);

    const grid = document.createElement("div");
    grid.classList.add("facts-grid");

    club.facts.forEach(function(fact) {
        const card = document.createElement("article");
        card.classList.add("fact-card");

        const factHeading = document.createElement("h3");
        factHeading.textContent = fact.label;

        const factValue = document.createElement("p");
        factValue.textContent = fact.value;

        card.appendChild(factHeading);
        card.appendChild(factValue);

        grid.appendChild(card);
    });

    section.appendChild(headingContainer);
    section.appendChild(grid);

    return section;
}


// Creates an achievement section.
function createAchievementSection(achievement) {
    const section = document.createElement("section");
    section.classList.add("achievements-section");

    const headingContainer = document.createElement("div");
    headingContainer.classList.add("section-heading");

    const eyebrow = document.createElement("p");
    eyebrow.classList.add("eyebrow");
    eyebrow.textContent = achievement.eyebrow;

    const heading = document.createElement("h2");
    heading.textContent = achievement.title;

    headingContainer.appendChild(eyebrow);
    headingContainer.appendChild(heading);

    const card = document.createElement("div");
    card.classList.add("achievements-card");

    achievement.blocks.forEach(function(block) {

        if (block.type === "subheading") {
            const subheading = document.createElement("h3");
            subheading.textContent = block.text;
            card.appendChild(subheading);
        }

        if (block.type === "paragraph") {
            addParagraph(card, block.text);
        }

        if (block.type === "list") {
            const list = document.createElement("ul");

            block.items.forEach(function(item) {
                addListItem(list, item);
            });

            card.appendChild(list);
        }
    });

    section.appendChild(headingContainer);
    section.appendChild(card);

    return section;
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

    if (navigationHelp) {
        navigationHelp.hidden = true;
    }

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

    stepLabel.textContent = "Club Profile";

    backButton.hidden = false;
    restartButton.hidden = false;

    if (navigationHelp) {
        navigationHelp.hidden = true;
    }

    exploreContent.innerHTML = "";

    const profile = document.createElement("div");
    profile.classList.add("dynamic-club-page");


    // Introduction and stadium

    const storySection = document.createElement("section");
    storySection.classList.add("club-story");

    const introduction = createStoryRow(
        "Introduction",
        club.introduction,
        false
    );

    storySection.appendChild(introduction);


    // About the club and team image

    const about = createStoryRow(
        "About the Club",
        club.about,
        true
    );

    storySection.appendChild(about);

    profile.appendChild(storySection);


    // Club information

    profile.appendChild(
        createFactsSection(club)
    );


    // Scorer, trophies, Ballon d'Or, and fun facts

    club.achievements.forEach(function(achievement) {
        profile.appendChild(
            createAchievementSection(achievement)
        );
    });


    exploreContent.appendChild(profile);


    // Navigation

    backButton.textContent =
        "← Back to " + country.name + " Clubs";

    restartButton.textContent =
        "Choose Another Country";

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

    if (navigationHelp) {
        navigationHelp.hidden = false;
    }

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


        // Club badge

        const clubImage = document.createElement("img");

        clubImage.src = club.badge;
        clubImage.alt = club.name + " badge";


        // Club name

        const clubName = document.createElement("h2");
        clubName.textContent = club.name;


        // View club text

        const viewText = document.createElement("span");
        viewText.classList.add("club-view-text");
        viewText.textContent = "View Club →";


        clubButton.appendChild(clubImage);
        clubButton.appendChild(clubName);
        clubButton.appendChild(viewText);


        // Changes the DOM instead of opening another page.

        clubButton.addEventListener(
            "click",
            function() {
                displayClubInformation(
                    club,
                    country
                );
            }
        );

        clubGrid.appendChild(clubButton);
    });

    exploreContent.appendChild(clubGrid);


    // Back to countries

    backButton.textContent = "← Back";

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

    if (navigationHelp) {
        navigationHelp.hidden = false;
    }

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
            "Explore soccer clubs from " +
            country.name
        );


        // Country flag background

        countryButton.style.backgroundImage =
            "linear-gradient(" +
            "rgba(0, 0, 0, 0.45), " +
            "rgba(0, 0, 0, 0.45)" +
            "), url('" +
            country.flag +
            "')";


        // Country name

        const countryName =
            document.createElement("span");

        countryName.classList.add("country-name");
        countryName.textContent = country.name;


        // Country description

        const countryDescription =
            document.createElement("span");

        countryDescription.classList.add(
            "country-description"
        );

        countryDescription.textContent =
            country.description;


        // Explore text

        const exploreText =
            document.createElement("span");

        exploreText.classList.add(
            "country-view-text"
        );

        exploreText.textContent =
            "Explore " +
            country.name +
            " →";


        countryButton.appendChild(countryName);
        countryButton.appendChild(
            countryDescription
        );

        countryButton.appendChild(exploreText);


        // Changes the DOM to show the clubs.

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
