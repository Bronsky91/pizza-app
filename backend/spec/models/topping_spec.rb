require 'rails_helper'

RSpec.describe Topping, type: :model do
  describe 'validations' do
    it 'validates presence of name' do
      topping = Topping.new(name: '')
      expect(topping).not_to be_valid
      expect(topping.errors[:name]).to include("can't be blank")
    end

    it 'validates uniqueness of name' do
      Topping.create!(name: 'Pepperoni')
      topping = Topping.new(name: 'Pepperoni')
      expect(topping).not_to be_valid
      expect(topping.errors[:name]).to include('has already been taken')
    end
  end

  describe 'associations' do
    it 'has many pizza_toppings' do
      expect(Topping.reflect_on_association(:pizza_toppings).macro).to eq(:has_many)
    end

    it 'has many pizzas through pizza_toppings' do
      association = Topping.reflect_on_association(:pizzas)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:pizza_toppings)
    end
  end
end
