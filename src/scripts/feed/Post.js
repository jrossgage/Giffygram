export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}" />
        <p>${postObject.description}<p>
        <p>${postObject.userId}
        <div><button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button></div>
      </section>
    `
  }