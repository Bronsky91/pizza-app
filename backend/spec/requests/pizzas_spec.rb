require 'rails_helper'

RSpec.describe "Pizzas", type: :request do
  describe "GET #index" do
    it "returns a successful response" do
      get '/pizzas'
      expect(response).to be_successful
    end

    it "returns all pizzas" do
      pizza1 = Pizza.create(name: "Pepperoni")
      pizza2 = Pizza.create(name: "Mushroom")

      get '/pizzas'
      expect(assigns(:pizzas)).to include(pizza1, pizza2)
    end
  end

  describe "GET #show" do
    it "returns a successful response" do
      pizza = Pizza.create(name: "Pepperoni")

      get "/pizzas/#{pizza.id}"
      expect(response).to be_successful
    end

    it "returns the requested pizza" do
      pizza = Pizza.create(name: "Pepperoni")

      get "/pizzas/#{pizza.id}"
      expect(assigns(:pizza)).to eq(pizza)
    end
  end

  describe "POST #create" do
    it "returns a successful response" do
      post "/pizzas", params: { pizza: { name: "Pepperoni" } }
      expect(response).to be_successful
    end
    
    it "creates a new pizza" do
      expect {
        post "/pizzas", params: { pizza: { name: "Pepperoni" } }
      }.to change(Pizza, :count).by(1)
    end
  end

  describe "PUT #update" do
    it "returns a successful response" do
      pizza = Pizza.create(name: "Pepperoni")

      put "/pizzas/#{pizza.id}", params: { pizza: { name: "Mushroom" } }
      expect(response).to be_successful
    end

    it "updates an existing pizza" do
      pizza = Pizza.create(name: "Pepperoni")

      put "/pizzas/#{pizza.id}", params: { pizza: { name: "Mushroom" } }
      expect(assigns(:pizza).name).to eq("Mushroom")
    end
  end

  describe "DELETE #destroy" do
    it "returns a successful response" do
      pizza = Pizza.create(name: "Pepperoni")

      delete "/pizzas/#{pizza.id}"
      expect(response).to be_successful
    end
    it "destroys an existing pizza" do
      pizza = Pizza.create(name: "Pepperoni")

      expect {
        delete "/pizzas/#{pizza.id}"
      }.to change(Pizza, :count).by(-1)
    end
  end

  describe "POST #update_toppings" do
    let!(:pizza) { Pizza.create(name: "Pepperoni") }
    let!(:topping1) { Topping.create(name: "Mushrooms") }
    let!(:topping2) { Topping.create(name: "Olives") }
  
    context "with valid toppings" do
      it "updates the pizza toppings" do
        post "/pizzas/#{pizza.id}/update_toppings", params: { topping_ids: [topping1.id, topping2.id] }
  
        expect(response).to have_http_status(:ok)
        expect(assigns(:pizza).toppings).to contain_exactly(topping1, topping2)
      end
    end
  
    context "with invalid toppings" do
      it "returns an error message" do
        post "/pizzas/#{pizza.id}/update_toppings", params: { topping_ids: [999] }
  
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include_json({ error: "No valid toppings provided" })
      end
    end
  end

  describe "DELETE #remove_toppings" do
    let!(:pizza) { Pizza.create(name: "Pepperoni") }
    let!(:topping1) { Topping.create(name: "Mushrooms") }
    let!(:topping2) { Topping.create(name: "Olives") }
  
    it "removes all toppings from the pizza" do
      pizza.toppings = [topping1, topping2]
  
      delete "/pizzas/#{pizza.id}/remove_toppings"
  
      expect(response).to have_http_status(:ok)
      expect(assigns(:pizza).toppings).to be_empty
    end
  end
end
