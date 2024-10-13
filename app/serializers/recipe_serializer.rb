class RecipeSerializer < ActiveModel::Serializer
  attributes :title, :ratings, :image_url, :author, :cook_time, :prep_time, :category, :ingredients

  def ingredients
    object.ingredients.map { |ingredient| IngredientSerializer.new(ingredient).as_json }
  end
end
