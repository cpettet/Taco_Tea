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
    })

});
