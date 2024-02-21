/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
let templeList = [];

/* async displayTemples Function */
const displayTemples = async (temples) => {
  // Clear the displayed list of temples
    reset();

    temples.forEach(temple => {
    // Create HTML elements
    const article = document.createElement('article');
    const heading = document.createElement('h3');
    const image = document.createElement('img');

    // Set temple name and image properties
    heading.textContent = temple.templeName;
    image.src = temple.imageUrl;
    image.alt = temple.location;

    // Append elements
    article.appendChild(heading);
    article.appendChild(image);
    templesElement.appendChild(article);
    });
};

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    templeList = await response.json();
    displayTemples(templeList);
    } catch (error) {
    console.error('Error fetching temples:', error);
    }
};

/* reset Function */
const reset = () => {
    templesElement.innerHTML = '';
};

/* filterTemples Function */
const filterTemples = (temples) => {
    reset();
    const filter = document.getElementById('filtered').value;

    switch (filter) {
    case "utah":
        displayTemples(temples.filter(temple => temple.location.includes("Utah")));
        break;
    case "notutah":
        displayTemples(temples.filter(temple => !temple.location.includes("Utah")));
        break;
    case "older":
        displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
        break;
    case "all":
    default:
        displayTemples(temples);
    }
};

getTemples();

/* Event Listener */
document.querySelector("#filtered").addEventListener("change", () => { filterTemples(templeList) });