import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import { Pizza } from "./interfaces/pizza";
import { Page, YELLOW } from "./constants";
import PageButton from "./components/PageButton";
import Card from "./components/Card";

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  // TODO: Toppings state
  const [selectedPage, setSelectedPage] = useState<Page>(Page.Pizzas);

  useEffect(() => {
    fetch("http://localhost:3000/pizzas")
      .then((r) => r.json())
      .then((pizzas) => {
        console.log("setting pizzas", pizzas);
        setPizzas(pizzas);
      });
  }, []);

  const handlePageToggle = (page: Page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <div className="header">
        <div style={{ fontWeight: "bold", fontSize: 32, color: "white" }}>
          <span style={{ color: "white" }}>STRONG</span>
          <span style={{ color: YELLOW }}>MIND</span> PIZZA
        </div>
      </div>
      <div className="body">
        <div className="toggleButtonsContainer">
          <PageButton
            page={Page.Pizzas}
            selectedPage={selectedPage}
            handlePageToggle={handlePageToggle}
          />
          <PageButton
            page={Page.Toppings}
            selectedPage={selectedPage}
            handlePageToggle={handlePageToggle}
          />
        </div>
        <div className="pageContainer">
          {pizzas.map((pizza) => (
            <Card pizza={pizza} key={pizza.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
