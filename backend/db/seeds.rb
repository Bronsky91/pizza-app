# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Pizza.destroy_all
Topping.destroy_all

pizza_names = ["Hawaiian", "Veggie"]
topping_names = [["Pineapple", "Ham"], ["Tomato", "Bell Pepper", "Onion", "Mushroom"]]

cheese = Topping.create(name: 'Cheese')

pizza_names.each_with_index do |pizza_name, index|
  pizza = Pizza.create(name: pizza_name)

  topping_names[index].each do |topping_name|
    topping = Topping.create(name: topping_name)
    pizza.toppings << topping
  end

  pizza.toppings << cheese
end