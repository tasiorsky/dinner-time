import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

export default () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(fetchRecipes, []);

  function fetchRecipes() {
    fetch("/recipes")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
  }

  return <>{recipes.map((recipe) => (
    <Recipe
      key={recipe.id}
      title={recipe.title}
      imageUrl={recipe.image_url}
      rating={recipe.rating}
      author={recipe.author}
      cookTime={recipe.cook_time}
      prepTime={recipe.prep_time}
      category={recipe.category}
    />
  ))}</>
}
