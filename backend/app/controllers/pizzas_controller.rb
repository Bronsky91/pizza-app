class PizzasController < ApplicationController
    before_action :set_pizza, only: [:show, :update, :destroy, :update_toppings, :remove_toppings]
  
    # GET /pizzas
    def index
      @pizzas = Pizza.all
      render json: @pizzas.as_json(include: :toppings)
    end
  
    # GET /pizzas/:id
    def show
      render json: @pizza.as_json(include: :toppings)
    end
  
    # POST /pizzas
    def create
      @pizza = Pizza.new(pizza_params)
  
      if @pizza.save
        render json: @pizza.as_json(include: :toppings), status: :created, location: @pizza
      else
        render json: @pizza.errors, status: :unprocessable_entity
      end
    end
  
    # PUT /pizzas/:id
    def update
      if @pizza.update(pizza_params)
        render json: @pizza.as_json(include: :toppings)
      else
        render json: @pizza.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /pizzas/:id
    def destroy
      @pizza.destroy
    end

    # POST /pizzas/:id/update_toppings
    def update_toppings
      @toppings = Topping.where(id: params[:topping_ids])

      if @toppings.empty?
        render json: { error: "No valid toppings provided" }, status: :unprocessable_entity
        return
      end

      @pizza.toppings = @toppings

      render json: @pizza.as_json(include: :toppings), status: :ok
    end

    # DELETE /pizzas/:id/delete_toppings
    def remove_toppings
      @pizza.toppings.clear

      render json: @pizza.as_json(include: :toppings), status: :ok
    end
  
    private
  
    def set_pizza
      @pizza = Pizza.includes(:toppings).find(params[:id])
    end
  
    def pizza_params
      params.require(:pizza).permit(:name, topping_ids: [])
    end
end
  