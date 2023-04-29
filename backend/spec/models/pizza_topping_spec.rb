require 'rails_helper'

RSpec.describe PizzaTopping, type: :model do
  describe 'validations' do
    it 'validates presence of pizza_id' do
      pizza_topping = PizzaTopping.new(pizza_id: nil, topping_id: 1)
      expect(pizza_topping).not_to be_valid
      expect(pizza_topping.errors[:pizza]).to include('must exist')
    end

    it 'validates presence of topping_id' do
      pizza_topping = PizzaTopping.new(pizza_id: 1, topping_id: nil)
      expect(pizza_topping).not_to be_valid
      expect(pizza_topping.errors[:topping]).to include('must exist')
    end 
    
  end

  describe 'associations' do
    it 'belongs to a pizza' do
      expect(PizzaTopping.reflect_on_association(:pizza).macro).to eq(:belongs_to)
    end

    it 'belongs to a topping' do
      expect(PizzaTopping.reflect_on_association(:topping).macro).to eq(:belongs_to)
    end
  end
end
