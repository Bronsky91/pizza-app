require 'rails_helper'

RSpec.describe Pizza, type: :model do
  describe 'validations' do
    it 'validates presence of name' do
      pizza = Pizza.new(name: '')
      expect(pizza).not_to be_valid
      expect(pizza.errors[:name]).to include("can't be blank")
    end

    it 'validates uniqueness of name' do
      Pizza.create!(name: 'Margarita')
      pizza = Pizza.new(name: 'Margarita')
      expect(pizza).not_to be_valid
      expect(pizza.errors[:name]).to include('has already been taken')
    end
  end

  describe 'associations' do
    it 'has many pizza_toppings' do
      expect(Pizza.reflect_on_association(:pizza_toppings).macro).to eq(:has_many)
    end

    it 'has many toppings through pizza_toppings' do
      association = Pizza.reflect_on_association(:toppings)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:pizza_toppings)
    end
  end
end
