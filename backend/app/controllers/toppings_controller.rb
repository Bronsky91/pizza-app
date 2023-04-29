class ToppingsController < ApplicationController
    before_action :set_topping, only: [:show, :update, :destroy]
  
    # GET /toppings
    def index
      @toppings = Topping.all
      render json: @toppings
    end
  
    # GET /toppings/:id
    def show
      render json: @topping
    end
  
    # POST /toppings
    def create
      @topping = Topping.new(topping_params)
  
      if @topping.save
        render json: @topping, status: :created, location: @topping
      else
        render json: @topping.errors, status: :unprocessable_entity
      end
    end
  
    # PUT /toppings/:id
    def update
      if @topping.update(topping_params)
        render json: @topping
      else
        render json: @topping.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /toppings/:id
    def destroy
      @topping.destroy
    end
  
    private
  
    def set_topping
      @topping = Topping.find(params[:id])
    end
  
    def topping_params
      params.require(:topping).permit(:name)
    end
end
  