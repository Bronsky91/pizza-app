Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :toppings, only: [:index, :show, :create, :update, :destroy]
  resources :pizzas, only: [:index, :show, :create, :update, :destroy] do
    post :update_toppings, on: :member
    delete :remove_toppings, on: :member
  end
end
