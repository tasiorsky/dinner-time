import React from "react";

export default (props) => (
  <div>
    <img src={props.imageUrl} width="200px" />
    <h3>{props.title}</h3>
    <p>{props.rating || "?"}</p>
    <p>{props.author}</p>
    <p>{props.cookTime}</p>
    <p>{props.prepTime}</p>
    <p>{props.category}</p>
  </div>
)
