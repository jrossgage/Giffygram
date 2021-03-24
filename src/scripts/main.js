import { getPosts, getUsers, getLoggedInUser, usePostCollection, createPost, getSinglePost, 
  updatePost, logoutUser, deletePost, setLoggedInUser, loginUser, registerUser } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"

//  * Main logic module for what should happen on initial page load for Giffygram
console.log("Main is Loaded");
console.log(JSON.parse(sessionStorage.getItem("user")).name); 
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
    logoutUser();
    sessionStorage.clear();
    checkForUser();
  }
})

// Alert Message when direct message icon is clicked (not functional yet)
applicationElement.addEventListener("click", event => {
  if (event.target.id === "directMessageIcon") {
    console.log(`You clicked the button!`)
  }
}
)

// Alert Message when Peanut butter icon is clicked (not functional yet)
applicationElement.addEventListener("click", event => {
  if (event.target.id === "homeButton")
    console.log(`Going home...`)
}
)

//edit button listener
applicationElement.addEventListener("click", event => {
  if (event.target.id.startsWith("edit")){              //startsWith checks what the id starts with rather than complete word
    const postId = event.target.id.split("__")[1];      //.split creates an array. Here we are targeting index of 1 which is the interpolated post object id.
    getSinglePost(postId)                       //calling getSinglePost on the postObj id
      .then(response => {                   //grabbing that response and then using it as an argument in showEdit.
        showEdit(response);
      })
  }
})


applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})

const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
}

//Update Button available once edit has begun. Similar process as the edit button and save button in targetting the correct post
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value  //Why is the [] there?
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    const timestamp = document.querySelector("input[name='postTime']").value
    
    const postObject = {      //creats a post object to be saved to the json
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
    
    //we can add the current time as well
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: Date.now()
    }

    //register event listener
    applicationElement.addEventListener("click", event => {
      event.preventDefault();
      if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
          name: document.querySelector("input[name='registerName']").value,
          email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
        .then(dbUserObj => {
          sessionStorage.setItem("user", JSON.stringify(dbUserObj));  //moving from object into string to place into the session storage. This allows the user to be logged in after registering.
          startGiffyGram();
        })
      }
    })

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

//Looks to the session storage to find the current logged in user.
const checkForUser = () => {
  if (sessionStorage.getItem("user")){        //if user exists
	  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));    //set the logged in user as an object parsed from a string. Here its string -> object.
    startGiffyGram();                 
  }else {
    showLoginRegister();        //calls a function that displays a login form
  }
}

//login form function
const showLoginRegister = () => {
  showNavBar();
  const entryElement = document.querySelector(".entryForm");
  //template strings can be used here too
  entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;  //hr= horizontal rule. Interpolates functions that carry 'cards'.
  //make sure the post list is cleared out too
const postElement = document.querySelector(".postList");
postElement.innerHTML = "";
}

//Login submit button
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,   //similar process to line 102-113 but is not setting variables.
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)               //passes object variable to loginUser
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})

const startGiffyGram = () => {
  showNavBar();
  showPostEntry();
  showPostList();
  showFooter();
};


checkForUser();