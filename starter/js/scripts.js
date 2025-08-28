// use fetch to retrieve about me data
const fetchUserData = async () => {
    try {
        const responseData = await fetch('./data/aboutMeData.json');
        if (!responseData.ok) {
            throw new Error(`Error fetching data: ${responseData.status}, ${responseData.statusText}`);
        } 
        const userData = await responseData.json(); 
        const aboutContainer = document.getElementById("aboutMe");
        const bioContainer = document.createElement('p'); // create p element
        bioContainer.textContent = userData.aboutMe; // populate p element
        const headshotContainer = document.createElement('div'); // create div element
        headshotContainer.classList.add('headshotContainer'); // add class to div element
        const headshotImage = document.createElement('img'); // create img element
        headshotImage.setAttribute('src', userData.headshot); // populate the img
        headshotImage.setAttribute('alt', 'Picture of the author'); // Set the alt text
        headshotContainer.append(headshotImage); // add it to the div
        const aboutDocumentFragment = document.createDocumentFragment(); // create fragment
        aboutDocumentFragment.append(bioContainer, headshotContainer); // add the p and the div
        aboutContainer.append(aboutDocumentFragment); // add fragment to the about container
        
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

const projectsContainer = document.getElementById('projectList');
const spotlightContainer = document.getElementById('projectSpotlight');
const spotlightTitles = document.getElementById('spotlightTitles');
// create elements for inside spotlightContainer
const spotlightTitlesH3 = document.createElement('h3');
const spotlightText = document.createElement('p');
const spotlightLink = document.createElement('a');
spotlightLink.innerHTML = "Click here to see more...";
spotlightLink.setAttribute('title', 'Click here to see more...');

// create empty array to hold the projects this will serve to populate the spotlight switch statement.
const projectsArray = [];

async function fetchProjectsData() {
    try {
        const response = await fetch('./data/projectsData.json');
        if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

        const projectsData = await response.json();

        projectsData.forEach(project => {
            // Normalize images
            const cardImage = project.card_image ?? project.spotlight_image ?? "../images/default_card.webp";
            const spotlightImage = project.spotlight_image ?? cardImage;

            // Short description
            let shortDesc = project.short_description;
            if (!shortDesc) {
                if (project.long_description) {
                    let index = 30;
                    while (index < project.long_description.length && project.long_description[index] !== " ") {
                        index++;
                    }
                    shortDesc = `${project.long_description.substring(0, index)}&hellip;`;
                } else {
                    shortDesc = "Project description not available";
                }
            }

            // Create card
            const projectCard = document.createElement('div');
            projectCard.classList.add('projectCard');
            projectCard.setAttribute('id', project.project_id);
            projectCard.style.cssText = `
                background-image: url(${cardImage});
                background-repeat: no-repeat;
                background-position: top center;
                background-size: cover;
                scroll-snap-align: start;
            `;
            projectCard.innerHTML = `
                <h4>${project.project_name}</h4>
                <p>${shortDesc}</p>
            `;
            projectsContainer.appendChild(projectCard);

            // Push into projectsArray
            projectsArray.push({
                project_id: project.project_id,
                project_name: project.project_name,
                short_description: shortDesc,
                long_description: project.long_description ?? shortDesc ?? "",
                card_image: cardImage,
                spotlight_image: spotlightImage,
                url: project.url ?? "#"
            });

            // event listener for each card // To Do: not anonymous function, does it need to be removed?
            projectCard.addEventListener("click", () => populateSpotlight(project.project_id));
        });

        // call the function to populate the spotlight section
        populateSpotlight();

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

// Populate spotlight function
function populateSpotlight(project_id) {
    // removed switch and used if statements seemed cleaner.
    let project;
    if (project_id) project = projectsArray.find(p => p.project_id === project_id);
    // no project id is called since none are clicked yet
    if (!project) {
        project = projectsArray[0];
    }
    // Something went totally wrong with the data.
    if (!project) {
        console.error("No project data found in projectsArray at all!");
        return;
    }

    // Update spotlight DOM
    spotlightTitlesH3.textContent = project.project_name;
    spotlightText.textContent = project.long_description || project.short_description || "";
    spotlightLink.href = project.url || "#";
    //clear the spotlightContainer and spotLightTitles before re-populating
    spotlightTitles.innerHTML = "";
    spotlightContainer.style.cssText = '';
    // now repopulate them
    spotlightContainer.style.cssText = `
                background-color: #336699;
                background-image: url(${project.spotlight_image ?? project.card_image});
                background-repeat: no-repeat;
                background-position: top center;
                background-size: cover;
                scroll-snap-align: start;
            `;
    spotlightLink.target = "_blank"; // Should it be blank? yes for this project due to the example.com otherwise not really.
    spotlightTitles.appendChild(spotlightTitlesH3);
    spotlightTitles.appendChild(spotlightText);
    spotlightTitles.appendChild(spotlightLink);
}


document.addEventListener("DOMContentLoaded", () => {
    // Scroll handler 
    const projectList = document.getElementById("projectList");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    const scrollAmount = 200;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const scrollHandler = (direction) => {
        if (desktopQuery.matches) {
            projectList.style.scrollSnapType = 'y mandatory';
            projectList.scrollBy({ top: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        } else {
            projectList.style.scrollSnapType = 'x mandatory';
            projectList.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    arrowLeft.addEventListener("click", () => scrollHandler("left"));
    arrowRight.addEventListener("click", () => scrollHandler("right"));

    // Fetch all data after DOM is ready
    fetchUserData();
    fetchProjectsData();
});


// form validation:
// - Email isn't empty
// - Message isn't empty
// - Email is a valid email address
// - There are no special characters used in the email address
// - There are no special characters used in the message
// - The message is no longer than 300 characters
// - Also... show a live count of the number of characters in the text area
// - illegal characters = /[^a-zA-Z0-9@._-]/
// - valid email address = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

