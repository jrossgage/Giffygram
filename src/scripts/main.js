import { getPosts, getUsers, getLoggedInUser, usePostCollection, createPost, getSinglePost, updatePost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js"
import { deletePost } from "./data/DataManager.js"
import { PostEdit } from "./feed/PostEdit.js"

//  * Main logic module for what should happen on initial page load for Giffygram
console.log("Main is Loaded");
// Displaying Posts
const showPostList = () => {
  const postElement = document.querySelector(".postList");
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts.reverse());
  })
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

//edit button listener
applicationElement.addEventListener("click", event => {
  if (event.target.id.startsWith("edit")){
    const postId = event.target.id.split("__")[1];
    getSinglePost(postId)
      .then(response => {
        showEdit(response);
      })
  }
})

const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
}

//Update Button
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    const timestamp = document.querySelector("input[name='postTime']").value
    
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: parseInt(timestamp),
      id: parseInt(postId)
    }
    
    showPostEntry();
    
    updatePost(postObject)
      .then(response => {
        
        showPostList();
      })
  }
})

   //delete button event listener
   applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("delete")) {
      const postId = event.target.id.split("__")[1];
    deletePost(postId)
      .then(response => {
        showPostList();
      })
}
})


//add footer event
applicationElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)
    console.log(`User wants to see posts since ${yearAsNumber}`)
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber);
  }
})
//filter data by year
const showFilteredPosts = (year) => {     //declaring function. Takes a parameter. 
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);   //finding the time between the year and the Jan 1, 1970. Storing in a variable
  //filter the data
  const filteredData = usePostCollection().filter(singlePost => {    //declaring a function. usePostCollection is from Data manager. Returns a copy of the data state. Filter method is called containing a function within the (). 
    if (singlePost.timestamp >= epoch) { 
      return singlePost                             // holds the instructions for the filter. If the timestamp of the singlePost is >= the variable epoch, return single post (filtered post).      return singlePost
    }
  })
  postElement.innerHTML = PostList(filteredData);                   // insert the filtered data in the designated location. 
}

const postElement = document.querySelector(".postList");          // select a place on the DOM and store location in a variable.


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