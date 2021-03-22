# Giffygram
A website allowing for the catalogging of .gifs. These gifs may be saved to a list component, rendering on the lower half of the browser. Gifs can be added along with a title and a 'story' or description of the gif. This list is searchable via the search bar at the top of the page and filtered by year the dropdown menu in the footer.

##  Languages Utilized
This site utilizes html, css styling, and javascript modules. Within the javascript is also event listener functionality. 

## How to Access
This website is not currently live. To access, pull the code from gitHub and serve locally. Pulling from gitHub requires a git clone of the repository. Find the link to the code within gitHub. To serve the site, when accessing your terminal, navigate to the /src directory. Once inside the src directory, issue the serve command. To iniate the json server, navigate to the api directory and issue the command, json-server -p 8088 -w giffygram.json. When both the json server and the site itself are being served, the site will be functional. 


## How to Use
Place a URL of a gif within the form in the 'URL of gif' text area. Add a descriptive title to the gif in the title text area. The description may be added within the 'story behind your gif...' text field. Once all fields have been filled, click the 'save' button and the gif will propogate in the "My List" section. The Cancel button will clear the form.

## Additional Functionality
Future planned functionality will included a user profile function. The Logout button will allow for the exiting of the current user profile in view, along with the saved gifs of that user. 
