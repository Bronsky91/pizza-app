require 'rails_helper'

RSpec.describe "Toppings", type: :request do
  describe "GET #index" do
    it "returns a successful response" do
      get '/toppings'
      expect(response).to be_successful
    end

    it "returns all toppings" do
      topping1 = Topping.create(name: "Mushrooms")
      topping2 = Topping.create(name: "Olives")

      get '/toppings'
      expect(response.body).to include_json([
        { name: topping1.name },
        { name: topping2.name }
      ])
    end
  end

  describe "GET #show" do
    it "returns a successful response" do
      topping = Topping.create(name: "Mushrooms")

      get "/toppings/#{topping.id}"
      expect(response).to be_successful
    end

    it "returns the requested topping" do
      topping = Topping.create(name: "Mushrooms")

      get "/toppings/#{topping.id}"
      expect(response.body).to include_json({ name: topping.name })
    end
  end

  describe "POST #create" do
    it "creates a new topping" do
      expect {
        post "/toppings", params: { topping: { name: "Mushrooms" } }
      }.to change(Topping, :count).by(1)
    end

    it "returns a successful response" do
      post "/toppings", params: { topping: { name: "Mushrooms" } }
      expect(response).to be_successful
    end

    it "returns the new topping" do
      post "/toppings", params: { topping: { name: "Mushrooms" } }
      expect(response.body).to include_json({ name: "Mushrooms" })
    end
  end

  describe "PUT #update" do
    it "updates an existing topping" do
      topping = Topping.create(name: "Mushrooms")

      put "/toppings/#{topping.id}", params: { topping: { name: "Olives" } }
      expect(response).to be_successful
    end

    it "updates the topping's attributes" do
      topping = Topping.create(name: "Mushrooms")

      put "/toppings/#{topping.id}", params: { topping: { name: "Olives" } }
      expect(response.body).to include_json({ name: "Olives" })
    end
  end

  describe "DELETE #destroy" do
    it "destroys an existing topping" do
      topping = Topping.create(name: "Mushrooms")

      expect {
        delete "/toppings/#{topping.id}"
      }.to change(Topping, :count).by(-1)
    end

    it "returns a successful response" do
      topping = Topping.create(name: "Mushrooms")

      delete "/toppings/#{topping.id}"
      expect(response).to be_successful
    end
  end
end
