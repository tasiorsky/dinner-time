import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import Pagination from "./Pagination";

export default () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(fetchRecipes, [ingredients, currentPage]);

  function fetchRecipes() {
    let url = "/recipes"
    if (ingredients.length > 0) url += "?" + ingredientsToParams()

    url += url.includes("?") ? `&page=${currentPage}` : `?page=${currentPage}`
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network response was notq ok.");
      })
      .then((res) => {
        if (res.meta) setTotalPages(res.meta.total_pages)
        setRecipes(res.data)
      })
  }

  function ingredientsToParams() {
    return ingredients.map(ingredient => `ingredients[]=${ingredient}`).join("&")
  }

  function handleChange(event) {
    setIngredients(event.target.value.split(",").filter(i => i.trim()))
  }

  function onPageChange(page) {
    setCurrentPage(page)
  }

  return <div>
    <div className="col-md-12">
      <h3>Ingredients:</h3>
      <em>Type all ingredients separated by coma</em>
      <form>
        <input type="textarea" name="ingredients" onChange={handleChange} className="form-control" />
      </form>
    </div >

    <div className="pagination">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>

    <div className="row col-md-12">
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
          input={ingredients}
        />
      ))}
    </div>
  </div >
}
