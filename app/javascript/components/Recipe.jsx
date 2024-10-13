import React from "react";

export default (props) => (
  <div className="card col-md-6">
    <img src={props.imageUrl} className="card-img-top" alt={props.title} />
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">
        <p>{props.rating || "?"}</p>
        <p>{props.author}</p>
        <p>{props.cookTime}</p>
        <p>{props.prepTime}</p>
        <p>{props.category}</p>
      </p>
    </div>
  </div>
)
