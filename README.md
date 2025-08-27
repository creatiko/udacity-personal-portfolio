# Personal Portfolio

## Getting Started

To get started, simply copy the CSS, data, and images folder to your local machine.  Once they're on your local system, you can see the results of your code by opening index.html in your browser. If you do this, remember that any changes you make won't appear on the page until you refresh your browser tab.

If you're using an editor like VSCode, you may want to install an extension for a live server. The [Live Server extension from Ritwick Dey](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) works well and also has live updates that will show any changes you make to your application without needing to refresh the page.

If you use a live server from within your editor, right-click on `index.html` and choose "Open with Live Server."

## Project Instructions

Every developer should have a portfolio page to highlight their skills and growth as a developer. At the end of this project, you'll have used your JavaScript skills to create a mock portfolio page.

In this project, you'll create a JavaScript file that will take external data and use it to populate a web page fully. The HTML framework is in place. The CSS for a responsive site is also in place. Your job will be to write JavaScript to add and manipulate the DOM and add in some additional code to do some client-side form validation.

Your JavaScript file will be in the `js` folder. Remember to add the script tag at the top of the HTML. 

There are two files that hold the JSON data in the data folder: aboutMeData.json and projectsData.json. While you can technically simply paste the data into your JavaScript file and access it directly, this is an opportunity to get used to fetching external data from an API and using it in your applications. Remember that even though you're fetching data from a JSON source, you still need to run the response object through the `.json()` method in order to return an object you can access. I'd suggest fetching each file and then storing the data as a global variable you can use throughout the JavaScript file.

**DO NOT EDIT ANY HTML, CSS, OR DATA FILES**

### - Start with the About Me section

We'll start off slow by doing some simple DOM manipulation. Start by importing the data from the `aboutMeData.json` file. From that data, add the "about me" value as a paragraph element. Then you'll need to add the value of `headshot` as a src attribute of an image element and a container to hold that image.

When you're done, the div with the id of `aboutMe` will have two children: 1 paragraph and one div with a class name of `headshotContainer`.

```
<div id="aboutMe">
    <p></p>
    <div class="headshotContainer"></div>
</div>
```

### - Move on to the Projects Section

This section has several moving parts. 

The projects section contains two main elements: the project cards and the project spotlight. The project cards will act as teasers the user can click on. When users click on a project card, the spotlight section will change to that project. The CSS should already be in place. Your job is to use Javascript to populate and update the page.

As an additional challenge, CSS has removed the scrollbars. You'll need to add code so that the arrows on the page can be used to scroll through the project cards.

First, grab the data from the `projectsData.json` file. The objects in the array have these key-value pairs...

    "project_id" = the id you'll use to target mapped project cards to update the spotlight element
    "project_name" = the title of the project
    "short_description" = teaser text for the project cards
    "long_description" = longer description of the project to be used in the spotlight element
    "card_image" = relative url to the image for the background of the project cards
    "spotlight_image" = relative url to a larger image for the background of the spotlight element
    "url" = a mock url to be used for a link for more information

Using any combination of loops and methods you need, create cards with this basic structure...

``` 
    <div class="projectCard">
        <h4></h4>
        <p><p>
    </div>
```
**Remember to use the project_id on each card as a target for your JavaScript**

Each card should be clickable, and when clicked, it will update the spotlight element. You will need listeners throughout the project. In this case, keep the listeners in your JavaScript and out of your HTML. Specifically, don't use HTML attributes like onclick or on pointer down to listen for events. Set up your own listeners.

The project spotlight section should have this final structure...
```
<div id="projectSpotlight">
    <h3 id="spotlightTitles"></h3>
    <p></p>
    <a>Click here to see more...</a>
</div>
```

**Notice that some of the projects are missing values.**

This can happen a lot when using external APIs. You should be able to handle the missing data by providing some sort of fallback if some of the data is missing. You shouldn't see any part of the webpage as 'undefined.' You have two images in the images folder to handle missing image files: `card_placeholder_bg.webp` and `spotlight_placeholder_bg.webp`.

You'll also need to add listeners for the navigation buttons provided in the "projectNavArrows" div. Remember that the site is responsive, and the layout changes at different screen sizes. You'll need to have them scroll horizontally at mobile screen sizes and vertically at desktop screen sizes. (HINT: Use the .matchMedia() method)

### - Finish with form validation

The provided HTML purposely lacks some of the native attributes that can help with form validation, like `maxLength` in the textarea element or the `email` type in the input element. Your next step is to add validation for the form element when submitting. You don't need to actually submit the form; simply display an alert that the form validation passed.

Here are the things you should validate for...
```
    - Email isn't empty
    - Message isn't empty
    - Email is a valid email address
    - There are no special characters used in the email address
    - There are no special characters used in the message
    - The message is no longer than 300 characters
    - Also... show a live count of the number of characters in the text area
```

You can use regular expressions for your validation rules. Since regular expressions aren't a part of this course, feel free to use these regex...
```
illegal characters  = /[^a-zA-Z0-9@._-]/
valid email address = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
**Note that this regex is NOT a secure method to counter XSS attacks in your application. This is a general test to be used for this course but should not be your main line of defense in a production application.**

If an input fails validation, an error message should appear, giving the user details on why the submission failed. These should be updated with the "emailError" div and the "messageError" div.
