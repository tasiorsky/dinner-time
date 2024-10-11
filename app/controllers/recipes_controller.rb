class RecipesController < ApplicationController
  def index
    recipes = Recipe.limit(50)
    render json: recipes
  end
end
