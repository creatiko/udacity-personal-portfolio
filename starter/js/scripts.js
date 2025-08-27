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
        headshotImage.setAttribute('src', userData.headshot2); // populate the img
        headshotImage.setAttribute('alt', 'Picture of the author'); // Set the alt text
        headshotContainer.append(headshotImage); // add it to the div
        const aboutDocumentFragment = document.createDocumentFragment(); // create fragment
        aboutDocumentFragment.append(bioContainer, headshotContainer); // add the p and the div
        aboutContainer.append(aboutDocumentFragment); // add fragment to the about container
        
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

fetchUserData();

const projectsContainer = document.getElementById("projectList"); // Main outside projects <sidebar>

const fetchProjectsData = async () => {
    try {
        const responseData = await fetch('./data/projectsData.json');
        if (!responseData.ok) {
            throw new Error(`Error fetching data: ${responseData.status}, ${responseData.statusText}`);
        }
        const projectsData = await responseData.json();
        console.log(projectsData);
        // Loop through each project
        projectsData.forEach(project => {
            const projectCard = document.createElement('div'); // create div element
            projectCard.classList.add('projectCard');
            projectCard.setAttribute('id', project.project_id); // give each div an id that matches the project_id
            project.card_image ?? (project.card_image = project.spotlight_image);
            projectCard.style.cssText = `background-image: url(/images/${project.card_image}); background-repeat: no-repeat; background-position: top center; background-size: cover; scroll-snap-align: start; `;
            // I know they probably want me to use nullish coalescence like project.short_description ?? "Project description not available" but I like this better.
            if (project.short_description == undefined){
                // if the short description is missing lets use the long description cut it off with substring but lets not have a word cut off in the middle. so we loop the string until we find a space et voila!
                if (project.long_description !== undefined) {
                    const maxLength = () => {
                        const longString = project.long_description;
                        let index = 30;
                        // Loop forward until we find a space or reach the end
                        while (index < longString.length && longString[index] !== " ") {
                            index++;
                        }
                        return index; 
                    };
                    project.short_description = `${project.long_description.substring(0, maxLength())}&hellip;`;
                }
                else {
                    project.short_description = "Project description not available"
                }
            }
            projectCard.innerHTML = `
                    <h4>${project.project_name}</h4>
                    <p>${project.short_description}</p>
                `;
            projectsContainer.append(projectCard);
        });
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

fetchProjectsData();

document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("projectList");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");

    const scrollAmount = 200; // My thought is this needs to match the card width/height no need to change for mobile or desktop since both w and h are 200px;

    // function to detect if desktop or mobile
    const isDesktop = () => window.innerWidth >= 1024; // I'm matching the media query used in styles.css

    const scrollHandler = (direction) => {
        if (isDesktop()) {
            projectsContainer.style.cssText = 'scroll-snap-type: y mandatory;'; // I like the cards to snap this is working on desktop
            // Desktop → vertical scroll
            if (direction === "left") {
                projectList.scrollBy({ top: -scrollAmount, behavior: "smooth" });
            } else {
                projectList.scrollBy({ top: scrollAmount, behavior: "smooth" });
            }
        } else {
            projectsContainer.style.cssText = 'scroll-snap-type: x mandatory;'; // I like the cards to snap this is working on mobile
            // Mobile → horizontal scroll
            if (direction === "left") {
                projectList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                projectList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    arrowLeft.addEventListener("click", () => scrollHandler("left"));
    arrowRight.addEventListener("click", () => scrollHandler("right"));

});
