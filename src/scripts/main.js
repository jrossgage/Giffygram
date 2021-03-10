import { getPosts, getUsers, getLoggedInUser, usePostCollection } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";

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
if(event.target.id === "homeButton")
  console.log(`Going home...`)
}
)

applicationElement.addEventListener("click", event => {
    if(event.target.id.startsWith("edit")) {
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



  const startGiffyGram = () => {
  showNavBar();
  showPostList();
  showFooter();
};


startGiffyGram();