class AddOnDeleteCascadeToPizzaToppings < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :pizza_toppings, :pizzas

    add_foreign_key :pizza_toppings, :pizzas, on_delete: :cascade
  end
end
