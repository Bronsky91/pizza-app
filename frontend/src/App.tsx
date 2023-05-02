import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import { Pizza, Topping } from "./interfaces/pizza";
import { Page, YELLOW } from "./constants";
import PageButton from "./components/PageButton";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
import AddModal from "./components/modals/AddModal";

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page>(Page.Pizzas);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/pizzas")
      .then((r) => r.json())
      .then((pizzas) => {
        console.log("setting pizzas", pizzas);
        setPizzas(pizzas);
      });

    fetch("http://localhost:3000/toppings")
      .then((r) => r.json())
      .then((toppings) => {
        console.log("setting toppings", toppings);
        setToppings(toppings);
      });
  }, []);

  const handlePageToggle = (page: Page) => {
    setSelectedPage(page);
  };

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const handleSaveCard = (name: string) => {
    // TODO: Using selectedPage add the appropriate card
    // TODO: API Call to create pizza or topping
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
          {selectedPage === Page.Pizzas
            ? pizzas.map((pizza) => (
                <Card
                  key={pizza.id}
                  type={Page.Pizzas}
                  item={pizza}
                  allToppings={toppings}
                />
              ))
            : toppings.map((topping) => (
                <Card key={topping.id} type={Page.Toppings} item={topping} />
              ))}
          <AddCard type={selectedPage} handleAddCard={handleAddCard} />
        </div>
      </div>
      {showAddModal && (
        <AddModal
          type={selectedPage}
          handleClose={() => {
            setShowAddModal(false);
          }}
          handleSaveCard={handleSaveCard}
        />
      )}
    </div>
  );
}

export default App;
