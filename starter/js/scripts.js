// Come on, I WILL insert my name there
const myName = document.querySelector('header h1');
myName.textContent = "Luis Carlos Ordonez";

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
spotlightLink.textContent = "Click here to see more...";
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
            //const cardImage = project.card_image ?? project.spotlight_image ?? "../images/card_placeholder_bg.webp";
            //const spotlightImage = project.spotlight_image ?? cardImage ?? "../images/spotlight_placeholder_bg.webp";
            // changed to match the project readme, I honestly prefer the above even if the spotlight image looks a bit pixelated, at least it matches the card.
            const cardImage = project.card_image ?? "../images/card_placeholder_bg.webp";
            const spotlightImage = project.spotlight_image ?? "../images/spotlight_placeholder_bg.webp";

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
            const projectCardH4 = document.createElement('h4');
            projectCardH4.textContent = `${project.project_name}`;
            const projectCardP = document.createElement('p');
            projectCardP.textContent = `${shortDesc}`;
            projectCard.append(projectCardH4, projectCardP);
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

    // // Highlight active project card
    // document.querySelectorAll('.projectCard').forEach(card => {
    //     if (card.id === project.project_id) {
    //         card.classList.add('highlight');
    //     } else {
    //         card.classList.remove('highlight');
    //     }
    // });
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

    // Submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent actual submission

        if (validateForm()) {
            processFormSuccess();        
            // Clear inputs
            emailInput.value = "";
            messageInput.value = "";
            charactersLeft.textContent = `Characters: 0/${maxMessageLength}`;

            // Reset any error styles just in case
            emailInput.style.borderColor = "";
            messageInput.style.borderColor = "";
            emailLabel.style.color = "";
            messageLabel.style.color = "";
            emailError.textContent = "";
            messageError.textContent = ""; 
        }
    });

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

const form = document.getElementById('formSection');
const emailInput = document.getElementById('contactEmail');
const messageInput = document.getElementById('contactMessage');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const charactersLeft = document.getElementById('charactersLeft');
const emailLabel = emailInput.previousElementSibling;
const messageContainer = charactersLeft.parentElement;
const messageLabel = messageContainer.previousElementSibling;

//const illegalChars = /[^a-zA-Z0-9@._-]/;
const illegalChars = /[^a-zA-Z0-9@._\- ]/; // provided regex wasn't allowing spaces, pretty annoying for a textarea
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxMessageLength = 300;

messageInput.addEventListener('input', () => {
    let value = messageInput.value;
    // Check if the value exceeds max length
    if (value.length > maxMessageLength) {
        // Stop input except delete/backspace
        messageInput.value = value.substring(0, maxMessageLength);
        messageError.textContent = `Message cannot exceed ${maxMessageLength} characters.`;
        messageInput.style.borderColor = "red";
        messageLabel.style.color = "red";
    } else {
        // Clear error when within limit
        messageError.textContent = "";
        messageInput.style.borderColor = "";
        messageLabel.style.color = "";
    }
    charactersLeft.textContent = `Characters: ${messageInput.value.length}/${maxMessageLength}`; // change the number as it inputs
});


function validateForm() {
    let isValid = true;
    // Reset previous error states
    emailError.textContent = "";
    messageError.textContent = "";
    emailInput.style.borderColor = "";
    messageInput.style.borderColor = "";
    emailLabel.style.color = "";
    messageLabel.style.color = "";
    const removeFormSuccess = document.getElementById('formSuccess');
    console.log(removeFormSuccess);
    if (removeFormSuccess) {
        removeFormSuccess.remove();
    }

    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Email validations
    if (emailValue === "") {
        emailError.textContent = "Email cannot be empty.";
        emailInput.style.borderColor = "red";
        emailLabel.style.color = "red";
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Email must be a valid address.";
        emailInput.style.borderColor = "red";
        emailLabel.style.color = "red";
        isValid = false;
    } else if (illegalChars.test(emailValue)) {
        emailError.textContent = "Email contains invalid characters.";
        emailInput.style.borderColor = "red";
        emailLabel.style.color = "red";
        isValid = false;
    }

    // Message validations
    if (messageValue === "") {
        messageError.textContent = "Message cannot be empty.";
        messageInput.style.borderColor = "red";
        messageLabel.style.color = "red";
        isValid = false;
    } else if (illegalChars.test(messageValue)) {
        messageError.textContent = "Message contains invalid characters.";
        messageInput.style.borderColor = "red";
        messageLabel.style.color = "red";
        isValid = false;
    } else if (messageValue.length > maxMessageLength) {
        messageError.textContent = `Message cannot exceed ${maxMessageLength} characters.`;
        messageInput.style.borderColor = "red";
        messageLabel.style.color = "red";
        isValid = false;
    }

    return isValid;
}

function processFormSuccess() {
    const formSection = document.getElementById('formSection');
    const formSuccess = document.createElement('div');
    formSuccess.setAttribute('id', 'formSuccess');
    formSuccess.style.cssText = `
                width: 100%;
                background-color: beige;
                padding: 5px 0;
                color: darkgreen;
                font-weight: bold;
            `;
    formSuccess.textContent = "Your form has been sent, thank you!";
    formSection.prepend(formSuccess);
    setTimeout(() => {
        formSection.removeChild(formSuccess);
    }, 5000);
}