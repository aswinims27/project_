let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function addRecipe() {
    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const instructions = document.getElementById('recipeInstructions').value;
    const imageInput = document.getElementById('recipeImage');

    if (name && ingredients && instructions) {
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                saveRecipe(name, ingredients, instructions, imageUrl);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveRecipe(name, ingredients, instructions, '');
        }
    } else {
        alert('Please fill out all fields');
    }
}

function saveRecipe(name, ingredients, instructions, imageUrl) {
    const newRecipe = { name, ingredients, instructions, imageUrl };
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    clearForm();
}

function displayRecipes(filteredRecipes = recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    filteredRecipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        recipeItem.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.imageUrl}" alt="${recipe.name}">
            <button class="delete-button" onclick="deleteRecipe(${index})">Delete</button>
        `;

        recipeItem.addEventListener('click', () => toggleRecipeDetails(recipeItem, index));

        recipeContainer.appendChild(recipeItem);
    });
}

function toggleRecipeDetails(recipeItem, index) {
    const isActive = recipeItem.classList.toggle('active');

    if (isActive) {
        const recipe = recipes[index];
        const recipeDetails = document.createElement('div');
        recipeDetails.classList.add('recipe-item-details');
        recipeDetails.innerHTML = `
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        recipeItem.appendChild(recipeDetails);
    } else {
        const recipeDetails = recipeItem.querySelector('.recipe-item-details');
        recipeDetails.remove();
    }
}

function clearForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeIngredients').value = '';
    document.getElementById('recipeInstructions').value = '';
    document.getElementById('recipeImage').value = '';
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

document.addEventListener('DOMContentLoaded', function () {
    displayRecipes();
});
