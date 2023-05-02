export enum Page {
    Pizzas = "Pizzas",
    Toppings = "Toppings",
  }

export const YELLOW = "#fcb900"
export const API_URL = process.env.NODE_ENV === 'production' ? "https://strongmind-pizza-server.fly.dev" : "http://localhost:3000"