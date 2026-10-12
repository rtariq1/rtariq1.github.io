// Activity 4: Change the skiing page to snowboarding using JSON data.

// Fetch the JSON file when the Change button is clicked.
async function loadSnowboardingData() {
  try {
    const response = await fetch("js/boardingData.json");
    if (!response.ok) {
      throw new Error("Could not load snowboarding data: " + response.status);
    }
    const data = await response.json();
    showSnowboarding(data);
  } catch (error) {
    console.error("Error loading JSON:", error);
    alert("Could not load snowboarding information. Please use a web server.");
  }
}

// Change only the existing elements' text, without replacing the elements.
function updateCards(gridId, cards) {
  const cardElements = document.querySelectorAll(`#${gridId} .card`);
  cards.forEach((card, index) => {
    if (cardElements[index]) {
      cardElements[index].querySelector("h3").textContent = card.title;
      cardElements[index].querySelector("p").textContent = card.description;
    }
  });
}

// Update the page with the information from the JSON file.
function showSnowboarding(data) {
  document.title = data.title;
  document.getElementById("styleName").textContent = data.header;
  document.getElementById("heroTitle").textContent = data.hero.headline;
  document.getElementById("heroDesc").textContent = data.hero.description;

  // The hero background uses the --hero-img CSS custom property.
  document.getElementById("heroSection").style.setProperty(
    "--hero-img", `url("${data.hero.image}")`
  );

  document.getElementById("sec1Title").textContent = data.sections.overview.title;
  document.getElementById("sec1Subtitle").textContent = data.sections.overview.subtitle;
  updateCards("sec1Grid", data.sections.overview.cards);

  document.getElementById("sec2Title").textContent = data.sections.equipment.title;
  document.getElementById("sec2Subtitle").textContent = data.sections.equipment.subtitle;
  updateCards("sec2Grid", data.sections.equipment.cards);
}

// Connect the existing Change button to the fetch function.
document.getElementById("changeThemeBtn").addEventListener("click", loadSnowboardingData);
