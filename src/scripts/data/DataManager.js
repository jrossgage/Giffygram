export const getUsers = () => {

  return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
      // do something with response here
      return parsedResponse;
    })
};

export const getDadJoke = () => {
  return fetch("https://icanhazdadjoke.com/", {
    method: 'Get',
    headers: {
      'Accept': 'application/json',
    }
  })
    .then(res => res.json())
}
//current state (original state) of the app's information
let postCollection = [];

//sole purpose is to return post Collection
export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work. (...) spread operator. 
  //the only thing that can change postCollection is the getPosts function.
  return [...postCollection];
}

export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}

export const postLike = likeObject => {
  return fetch(`http://localhost:8088/userLikes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likeObject)
  })
    .then(response => response.json())
    .then(getPosts)
}


//creating a post
export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {   //object full of details saying how to handle the info
    method: "POST",                             //must be capitalized. Says to post new idea to the database. Think postman app.
    headers: {
      "Content-Type": "application/json"     // specifies to the database what the type is
    },
    body: JSON.stringify(postObj)               //converts into a string of JSON. This allows for the "" formatting for the json file. Recognizes the data as object.

  })
    .then(response => response.json())          //converts the response back into a json format.
}

//change declaration to let
let loggedInUser = {}

export const logoutUser = () => {
  loggedInUser = {}
}

export const getLoggedInUser = () => {
  return { ...loggedInUser };
}

export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}

export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      //is there a user?
      console.log("parsedUser", parsedUser) //data is returned as an array
      if (parsedUser.length > 0) {
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      } else {
        //no user
        return false;
      }
    })
}

export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
    .then(response => response.json())
    .then(parsedUser => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
}

//deleting a post
export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }

  })
    .then(response => response.json())
    .then(getPosts)
}

export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)

  })
    .then(response => response.json())
    .then(getPosts)
}

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

//filter data by user posts
export const getfilterUserPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse
      return parsedResponse;
    })
}

//gets likes from database
export const getLikes = (postId) => {
  return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
    .then(response => response.json())
}