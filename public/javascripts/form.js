window.addEventListener("DOMContentLoaded", async () => {
    console.log("Hello from the frontend");

    const isRecipe = document.querySelector('#postType');
    const recipeContainer = document.querySelector('.recipe')

    isRecipe.addEventListener('change', (e)=>{
        const value = e.target.value;
        if (value === 'recipe'){
            recipeContainer.hidden = false;
        } else{
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
            const res = await fetch(`/posts/${postId}123`, { method: "DELETE" });
            if (res.status !== 200) {
                throw Error("Post was not deleted")
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

});
