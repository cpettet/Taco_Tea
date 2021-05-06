window.addEventListener("DOMContentLoaded", async () => {
  console.log("Hello from the frontend");

  const isRecipe = document.querySelector("#postType");
  const recipeContainer = document.querySelector(".recipe");

  isRecipe.addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "recipe") {
      recipeContainer.hidden = false;
    } else {
      recipeContainer.hidden = true;
    }
  });

  const deleteButton = document.querySelector("#post-delete");
  // grabs the id of the post
  const postId = window.location.href.split("posts/")[1];
  deleteButton.addEventListener("click", async (e) => {
    // Let's come back to this
    e.preventDefault();
    try {
      const res = await fetch(`/posts/${postId}`, { method: "DELETE" });
      if (res.status !== 200) {
        throw Error("Post was not deleted");
      }
      window.location.replace("/");
    } catch (e) {
      const errorBox = document.querySelector(".error-box");
      errorBox.hidden = false;
      errorBox.innerHTML = e;
      errorBox.style.textAlign = "center";
      errorBox.style.marginTop = "1rem";
    }
  });

  const modifyButton = document.querySelector("#post-edit");
  modifyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.querySelector(".form-box");
    const formData = new FormData(form);
    const title = formData.get("title");
    const post_type = formData.get("postType");
    const isComments = formData.get("isComments");
    const isEmojis = formData.get("isEmojis");
    const doc_body = formData.get("body");
    console.log(isComments);
    console.log(isEmojis);
    const payload = {
      title,
      post_type,
      isComments,
      isEmojis,
      body: doc_body,
    };
    try {
      const res = await fetch(`/posts/${postId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.status !== 200) {
        throw Error("Post was not modified");
      }
      window.location.replace("/");
    } catch (e) {
      const errorBox = document.querySelector(".error-box");
      errorBox.hidden = false;
      errorBox.innerHTML = e;
      errorBox.style.textAlign = "center";
      errorBox.style.marginTop = "1rem";
    }
  });

  //listen for allowed comments && likes
  const allowComments = document.querySelector("select[name='isComments']");
  const commentsContainer = document.querySelector(".form-box.comment-box");

  if (allowComments.value === "true") {
    commentsContainer.hidden = false;
  } else {
    commentsContainer.hidden = true;
  }

  allowComments.addEventListener("change", (e) => {
    const isComments = allowComments.value;
    console.log(typeof isComments);
    if (isComments === "true") {
      commentsContainer.hidden = false;
    } else {
      commentsContainer.hidden = true;
    }
  });

  const commentSubmit = document.querySelector("#add-comment");
  commentSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    //get commentBody value
    const content = document.querySelector("#comment-text-area").value;
    const payload = {
      content,
      post_id: postId,
    };
    try {
      const response = await fetch(`/comments`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error(`there was an error! The comment could not be added`);
      }
      window.location.replace("/");
    } catch (error) {
      const errorBox = document.querySelector(".error-box");
      errorBox.hidden = false;
      errorBox.innerHTML = e;
      errorBox.style.textAlign = "center";
      errorBox.style.marginTop = "1rem";
    }
  });
  
});
