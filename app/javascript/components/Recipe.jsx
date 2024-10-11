import React from "react";

export default (props) => (
  <div>
    <h3>{props.title}</h3>
    <img src={props.imageUrl} width="200px" />
  </div>
)
