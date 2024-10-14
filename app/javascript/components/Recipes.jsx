import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

export default () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(fetchRecipes, []);

  function fetchRecipes() {
    let url = "/recipes"
    if (ingredients.length > 0) url += "?" + ingredientsToParams()
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network response was notq ok.");
      })
      .then((res) => setRecipes(res))
  }

  function ingredientsToParams() {
    return ingredients.map(ingredient => `ingredients[]=${ingredient.trim()}`).join("&")
  }

  function handleChange(event) {
    setIngredients(event.target.value.split(",").filter(i => i))
  }

  function onSubmit(event) {
    event.preventDefault()
    fetchRecipes()
  };

  return <div className="row">
    <div className="col-md-4">
      <h3>
        Ingredients:
      </h3>
      <form onSubmit={onSubmit}>
        <input type="textarea" name="ingredients" onChange={handleChange} className="form-control" />
        <input className="btn btn-success" type="submit" value="Submit"/>
      </form>
    </div >
    <div className="row col-md-8">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          title={recipe.title}
          imageUrl={recipe.image_url}
          rating={recipe.rating}
          author={recipe.author}
          cookTime={recipe.cook_time}
          prepTime={recipe.prep_time}
          category={recipe.category}
          ingredients={recipe.ingredients}
        />
      ))}
    </div>
  </div >
}
