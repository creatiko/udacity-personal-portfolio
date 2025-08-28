# Personal Portfolio

### Accessing the Working Directory

The working directory for this project is the `root` folder in this repo - all the scripts, like npm start or run within the directory.

### Install Dependencies

Once in the working directory, you need to add all of the node.js dependencies for the live server to work.

```bash
npm install
```

## Project Instructions

Every developer should have a portfolio page to highlight their skills and growth as a developer. For this project, I used my JavaScript skills to create a mock portfolio page.

In this project, I created a JavaScript file that takes external data and populates a web page fully. The HTML framework is in place. The CSS for a responsive site is also in place. My job was to write JavaScript to add and manipulate the DOM and add in some additional code to do some client-side form validation.

The JavaScript file is in the `js` folder.

There are two files that hold the JSON data in the data folder: aboutMeData.json and projectsData.json. this was an opportunity to get used to fetching external data from an API and using it in my applications.

**DO NOT EDIT ANY HTML, CSS, OR DATA FILES**

### - Started with the About Me section

I started off slow by doing some simple DOM manipulation. I imported the data from the `aboutMeData.json` file. From that data, added the "about me" value as a paragraph element. Then I added the value of `headshot` as a src attribute of an image element and a container to hold that image.

The div with the id of `aboutMe` has two children: 1 paragraph and one div with a class name of `headshotContainer`.

```
<div id="aboutMe">
    <p></p>
    <div class="headshotContainer"></div>
</div>
```

### - Moved on to the Projects Section

This section has several moving parts.

The projects section contains two main elements: the project cards and the project spotlight. The project cards act as teasers the user can click on. When users click on a project card, the spotlight section changes to that project.

As an additional challenge, CSS has removed the scrollbars. I needed to add code so that the arrows on the page can be used to scroll through the project cards.

First, I fetched the data from the `projectsData.json` file. The objects in the array have these key-value pairs...

    "project_id" = the id I use to target mapped project cards to update the spotlight element
    "project_name" = the title of the project
    "short_description" = teaser text for the project cards
    "long_description" = longer description of the project to be used in the spotlight element
    "card_image" = relative url to the image for the background of the project cards
    "spotlight_image" = relative url to a larger image for the background of the spotlight element
    "url" = a mock url to be used for a link for more information

Using loops and methods I created cards with this basic structure...

```
    <div class="projectCard">
        <h4></h4>
        <p><p>
    </div>
```

**Remember to use the project_id on each card as a target for your JavaScript**

Each card is clickable, and when clicked, it updates the spotlight element.

The project spotlight section should have this final structure...

```
<div id="projectSpotlight">
    <h3 id="spotlightTitles"></h3>
    <p></p>
    <a>Click here to see more...</a>
</div>
```

**Notice that some of the projects are missing values.**

This can happen a lot when using external APIs. I handled the missing data by providing some sort of fallback if some of the data is missing. You shouldn't see any part of the webpage as 'undefined.' There are two images in the images folder to handle missing image files: `card_placeholder_bg.webp` and `spotlight_placeholder_bg.webp`.

I also added listeners for the navigation buttons provided in the "projectNavArrows" div. The site is responsive, and the layout changes at different screen sizes. I had them scroll horizontally at mobile screen sizes and vertically at desktop screen sizes.

### - Finished with form validation

The provided HTML lacked some of the native attributes that can help with form validation, like `maxLength` in the textarea element or the `email` type in the input element. I added validation for the form element when submitting. Then I display an alert that the form validation passed.

Here are the things I validated for...

```
    - Email isn't empty
    - Message isn't empty
    - Email is a valid email address
    - There are no special characters used in the email address
    - There are no special characters used in the message
    - The message is no longer than 300 characters
    - Also... show a live count of the number of characters in the text area
    - illegal characters  = /[^a-zA-Z0-9@._-]/
    - valid email address = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

If an input fails validation, an error message appears, giving the user details on why the submission failed. These are updated within the "emailError" div and the "messageError" div.
