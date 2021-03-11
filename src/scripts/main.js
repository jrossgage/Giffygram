import { getPosts, getUsers, getLoggedInUser, usePostCollection, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js"

//  * Main logic module for what should happen on initial page load for Giffygram

// Displaying Posts
const showPostList = () => {
  const postElement = document.querySelector(".postList");
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
  })
}
//displaying filtered Posts
const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter(singlePost => {
    if (singlePost.timestamp >= epoch) {
      return singlePost
    }
  })
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = PostList(filteredData);
}


// Displaying NavBar
const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
  navElement.innerHTML = NavBar();
}

// Displaying Footer
const showFooter = () => {
  // Get reference location on the DOM where the footer will display
  const footerElement = document.querySelector(".footer");
  footerElement.innerHTML = Footer();

}
// Declaring location in Main and storing in a variable
const applicationElement = document.querySelector(".giffygram");


//add logout event
applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    console.log("You clicked on logout")
  }
})

// Alert Message when direct message icon is clicked
applicationElement.addEventListener("click", event => {
  if (event.target.id === "directMessageIcon") {
    console.log(`You clicked the button!`)
  }
}
)

// Alert Message when Peanut butter icon is clicked
applicationElement.addEventListener("click", event => {
  if (event.target.id === "homeButton")
    console.log(`Going home...`)
}
)

applicationElement.addEventListener("click", event => {
  if (event.target.id.startsWith("edit")) {
    console.log("post clicked", event.target.id.split("--"))
    console.log("the id is", event.target.id.split("--")[1])
  }
})

//add footer event
applicationElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)

    console.log(`User wants to see posts since ${yearAsNumber}`)
    showFilteredPosts(yearAsNumber);
  }
})

//cancel and submit buttons event listeners. This buttons exist on the form.
applicationElement.addEventListener("click", event => {
  if (event.target.id === "newPost__cancel") {   //button id found in PostEntry HTML
    showPostEntry();
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();                                 //prevents the normal refresh behavior of the browser. Useful for single page apps when form tags are present.
  if (event.target.id === "newPost__submit") {            //targets the submit button found in PostEntry HTML
    //collect the input values into an object to post to the DB (database)
    const title = document.querySelector("input[name='postTitle']").value  /*why are the [] present??*/
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: Date.now()
    }

    // be sure to import from the DataManager
    createPost(postObject)
      .then(response => {
        showPostList();    //calls the function to grap the new list of posts with newly generated post.
        showPostEntry();   //test. resets the form.
                           
      })
  }
})

//displays the form. Will be called in startGiffyGram() 
const showPostEntry = () => { 
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
}


const startGiffyGram = () => {
  showNavBar();
  showPostEntry();
  showPostList();
  showFooter();
};


startGiffyGram();