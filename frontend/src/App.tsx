import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { Pizza, Topping } from "./interfaces/pizza";
import { API_URL, Page, YELLOW } from "./constants";
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
    fetch(`${API_URL}/pizzas`)
      .then((r) => r.json())
      .then((pizzas) => {
        setPizzas(pizzas);
      });

    fetch(`${API_URL}/toppings`)
      .then((r) => r.json())
      .then((toppings) => {
        setToppings(toppings);
      });
  }, []);

  const handlePageToggle = (page: Page) => {
    setSelectedPage(page);
  };

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const setItems = selectedPage === Page.Pizzas ? setPizzas : setToppings;

  const addItem = (item: any) => {
    setItems((items: any) => [...items, item]);
  };

  const removeItem = (id: number) => {
    setItems((items: any) => items.filter((i: any) => i.id !== id));
  };

  const updateItemName = (name: string, id: number) => {
    setItems((items: any) =>
      items.map((i: any) => (i.id === id ? { ...i, name } : i))
    );
  };

  const handleSaveCard = (name: string) => {
    const path = `${API_URL}/${selectedPage.toLowerCase()}`;

    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(r);
      })
      .then((item) => {
        addItem(item);
      })
      .catch(() => {
        alert(
          `An error occured attempting to add a ${
            selectedPage === Page.Pizzas ? "Pizza" : "Topping"
          }, make sure the name is not a duplicate and try again`
        );
      })
      .finally(() => setShowAddModal(false));
  };

  const handleEdit = async (id: number, newName: string) => {
    const path = `${API_URL}/${selectedPage.toLowerCase()}/${id}`;

    return fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(r);
      })
      .then((item) => {
        updateItemName(item.name, id);
      })
      .catch(() =>
        alert(
          `There was an error editing ${
            selectedPage === Page.Pizzas ? "Pizza" : "Topping"
          }`
        )
      );
  };

  const handleDelete = async (id: number) => {
    const path = `${API_URL}/${selectedPage.toLowerCase()}/${id}`;

    return fetch(path, {
      method: "DELETE",
    })
      .then((r) => (r.ok ? removeItem(id) : Promise.reject(r)))
      .catch((r) => {
        alert(
          `There was an error deleting ${
            selectedPage === Page.Pizzas ? "Pizza" : "Topping"
          }. If you're deleting a topping make sure it's not being used by a pizza currently`
        );
      });
  };

  const handleUpdateTopping = async (id: number, toppings: Topping[]) => {
    // Depending on if the toppings array is empty the API call will change
    const path = `${API_URL}/pizzas/${id}/${
      toppings.length > 0 ? "update_toppings" : "delete_toppings"
    }`;

    return fetch(path, {
      method: toppings.length > 0 ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topping_ids: toppings.map((t) => t.id) }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(r);
      })
      .then((pizza) => {
        setPizzas((pizzas) =>
          pizzas.map((p) => (p.id === pizza.id ? pizza : p))
        );
      })
      .catch(() => {
        alert(
          `An error occured when attempting update toppings, please try again`
        );
      });
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
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleUpdateTopping={handleUpdateTopping}
                />
              ))
            : toppings.map((topping) => (
                <Card
                  key={topping.id}
                  type={Page.Toppings}
                  item={topping}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
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
