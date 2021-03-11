export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
};
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

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse
        return parsedResponse;
    })
}

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

const loggedInUser = {              //provides a default user. Initiazes the "1" value
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}

