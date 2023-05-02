import React, { useState } from "react";
import "../../styles/components/modals/ToppingModal.css";
import { Topping } from "../../interfaces/pizza";

const ManageToppingModal = ({
  pizza,
  allToppings,
  handleClose,
  handleSave,
}: any) => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(
    pizza.toppings
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toppingId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    const checkedTopping = allToppings.find((t: Topping) => t.id === toppingId);

    setSelectedToppings((prevSelectedToppings) => {
      if (isChecked) {
        return [...prevSelectedToppings, checkedTopping];
      } else {
        return prevSelectedToppings.filter((t) => t.id !== toppingId);
      }
    });
  };

  return (
    <div className="toppingContainer">
      <div className="toppingHeader">
        <div className="toppingTitle">Topping Management</div>
        <div className="toppingSubTitle">Pizza: {pizza.name}</div>
      </div>
      <div className="toppingListContainer">
        {allToppings.map((topping: Topping) => (
          <label key={topping.name}>
            <input
              type="checkbox"
              value={topping.id}
              checked={!!selectedToppings.find((t) => t.id === topping.id)}
              onChange={handleCheckboxChange}
            />
            {topping.name}
          </label>
        ))}
      </div>
      <div className="toppingFooter">
        <button onClick={handleSave} style={{ padding: "5px" }}>
          Save Toppings
        </button>
        <button onClick={handleClose} style={{ width: "50%" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageToppingModal;
