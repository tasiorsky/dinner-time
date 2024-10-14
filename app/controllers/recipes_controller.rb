class RecipesController < ApplicationController
  def index
    serialized_recipes = ActiveModel::Serializer::CollectionSerializer
      .new(recipes, serializer: RecipeSerializer)
    render json: serialized_recipes
  end

  def recipes
    ingredients_pattern = (recipe_params[:ingredients] || []).map { |name| "%#{name}%" }
    Recipe
      .joins(:ingredients)
      .where(ingredients_pattern.map { "ingredients.name LIKE ?" }.join(" OR "), *ingredients_pattern)
      .group("recipes.id")
      .select("recipes.*, COUNT(DISTINCT ingredients.id) AS matching_ingredients_count")
      .order("matching_ingredients_count DESC")
  end

  private

  def recipe_params
    params.permit(ingredients: [])
  end
end
