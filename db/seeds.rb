# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

file = File.open("./vendor/recipes-en.json")
recipes = JSON.parse(file.read)
recipes.each do |recipe|
  attrs = recipe.except("ingredients", "image")
  attrs["image_url"] = recipe["image"]
  new_recipe = Recipe.create!(attrs)

  ingredients = recipe["ingredients"].map { |i| { name: i, recipe_id: new_recipe.id } }
  Ingredient.insert_all(ingredients)
end
