// use fetch to retrieve aboutme.json
fetch('../data/aboutme.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.aboutMe);
        console.log(data.headshot);

        // Insert into DOM
        const aboutContainer = document.getElementById("aboutMe");
        // create p element
        const bioContainer = "p";
        bioContainer.textContent = data.aboutMe;
        // create div element
        const headshotContainer = "div";
        headshotContainer.classlist.add('headshotContainer');
        // create img element
        const headshotImage = "img";
        headshotImage.src = data.headshot;
    })
    .catch(error => console.error("Error loading JSON:", error));