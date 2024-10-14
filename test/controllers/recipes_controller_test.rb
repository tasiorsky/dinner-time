require "test_helper"

class RecipesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should return proper json" do
    create(:recipe)

    get :index

    assert_response :success

    json_response = JSON.parse(response.body)
    assert json_response.key?("data")
    assert json_response.key?("meta")
  end

  test "should return empty array without params" do
    create(:recipe)

    get :index

    assert_response :success

    json_response = JSON.parse(response.body)
    assert_empty json_response["data"]
  end

  test "should return recipes with matching ingredients" do
    recipe_1 = create(:recipe)
    create(:ingredient, name: "1 cup of milk", recipe: recipe_1)
    create(:ingredient, name: "1 pinch salt", recipe: recipe_1)
    recipe_2 = create(:recipe)
    create(:ingredient, name: "1 cup of milk", recipe: recipe_2)
    create(:ingredient, name: "2 cups warm water", recipe: recipe_2)
    create(:ingredient, name: "1 egg", recipe: recipe_2)
    create(:ingredient, name: "1 pinch salt", recipe: recipe_2)
    recipe_3 = create(:recipe)
    create(:ingredient, name: "3 cucumbers", recipe: recipe_3)
    create(:ingredient, name: "1 pinch salt", recipe: recipe_3)
    create(:ingredient, name: "1 cup flour", recipe: recipe_3)

    get :index, params: { ingredients: [ "milk", "salt" ] }

    assert_response :success

    json_response = JSON.parse(response.body)

    assert_equal [ recipe_1.id, recipe_2.id ].to_set, json_response["data"].map { |r| r["id"] }.to_set
  end
end
