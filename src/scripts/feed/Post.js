import { getLikes } from "../data/DataManager.js"

const getNumberOfLikes = (postId) => {
  getLikes(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
    })
}


export const Post = (postObject) => {
  if (JSON.parse(sessionStorage.getItem("user")).name === postObject.user.name) {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}" />
        <p>${postObject.description}
        <p>${postObject.user.name}
        <div><button id="edit--${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
        <button id="like__${postObject.id}">Like</button></div>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
      </section>`}
  else {
    return `
        <section class="post">
          <header>
              <h2 class="post__title">${postObject.title}</h2>
          </header>
          <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}" />
          <p>${postObject.description}<p>
          <p>${postObject.user.name}<p>
          <button id="like__${postObject.id}">Like</button>
          <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
          </section>`
  }
}

