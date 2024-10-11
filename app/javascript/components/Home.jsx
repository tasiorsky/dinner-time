import React from "react";
import { Link } from "react-router-dom"

export default () => <>
  <h1>It's dinner time !</h1>
  <p>Find the most relevant recipes that you can prepare with the ingredients that you have at home!</p>
  <Link
    to="/recipes"
    className="btn btn-lg custom-button"
    role="button"
  >
    View Recipes
  </Link>
</>
