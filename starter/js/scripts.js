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

const fetchProjectsData = async () => {
    try {
        const responseData = await fetch('./data/projectsData.json');
        if (!responseData.ok) {
            throw new Error(`Error fetching data: ${responseData.status}, ${responseData.statusText}`);
        }
        const projectsData = await responseData.json();
        console.log(projectsData);
        const projectsContainer = document.getElementById("projectList"); // Main outside projects <sidebar>
        // Loop through each project
        projectsData.forEach(project => {
            const projectCard = document.createElement('div'); // create div element
            projectCard.setAttribute('id', project.project_id); // give each div an id that matches the project_id
            projectCard.innerHTML = `
                    <h2>${project.project_name}</h2>
                    <p>${project.short_description || ""}</p>
                    <img src="${project.card_image || ""}" alt="${project.project_name}">
                    <a href="${project.url || '#'}" target="_blank">View Project</a>
                `;
            projectsContainer.append(projectCard);
        });


    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

fetchProjectsData();