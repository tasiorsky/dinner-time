import React from "react";

export default (props) => {
  const ingredientClass = props.input

  return <div className="card col-md-6">
    <img src={props.imageUrl} className="card-img-top" alt={props.title} />
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <div className="card-text">
        <p>Rating: {props.rating || "?"}</p>
        <p>Author: {props.author}</p>
        <p>Cooking time: {props.cookTime}m</p>
        <p>Preparation time: {props.prepTime}m</p>
        <p>Category: {props.category}</p>
        <p>Ingredients:</p>
        <ul>
          {props.ingredients && props.ingredients.map((ingredient) => {
            let presentIngredients = props.input.filter(input => ingredient.name.match(input))
            let ingredientClass = presentIngredients.length > 0 ? "fw-bold text-green" : ""
            return <li className={ingredientClass}>{ingredient.name}</li>
          })}
        </ul>
      </div>
    </div>
  </div>
}
