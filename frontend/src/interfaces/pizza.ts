export interface Pizza {
    id: number
    name: string
    created_at: string
    updated_at: string
    toppings: Topping[]
  }
  
  export interface Topping {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
  