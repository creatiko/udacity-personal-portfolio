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
        headshotImage.src = userData.headshot; // populate the img
        headshotContainer.append(headshotImage); // add it to the div
        const aboutDocumentFragment = document.createDocumentFragment(); // create fragment
        aboutDocumentFragment.append(bioContainer, headshotContainer); // add the p and the div
        aboutContainer.append(aboutDocumentFragment); // add fragment to the about container
        
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

fetchUserData();