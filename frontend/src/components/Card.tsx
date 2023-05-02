import React, { useEffect, useState } from "react";
import "../styles/components/Card.css";
import { Pizza, Topping } from "../interfaces/pizza";
import DeleteModal from "./modals/DeleteModal";
import { Page } from "../constants";
import EditModal from "./modals/EditModal";
import ManageToppingModal from "./modals/ManageToppingModal";

interface CardProps {
  pizza: Pizza;
  allToppings: Topping[];
}

enum Options {
  None = "none",
  UpdateTopppings = "update toppings",
  Edit = "edit",
  Delete = "delete",
}

const Card = ({ pizza, allToppings }: CardProps) => {
  const [selectedOption, setSelectedOption] = useState<Options>(Options.None);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showToppingModal, setShowToppingModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectedOption === Options.Delete) {
      setShowDeleteModal(true);
    }
    if (selectedOption === Options.Edit) {
      setShowEditModal(true);
    }
    if (selectedOption === Options.UpdateTopppings) {
      setShowToppingModal(true);
    }
  }, [selectedOption]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as Options);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedOption(Options.None);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedOption(Options.None);
  };

  const handleCloseToppingModal = () => {
    setShowToppingModal(false);
    setSelectedOption(Options.None);
  };

  const handleDelete = () => {
    // TODO: Delete API Call
  };

  const handleEdit = () => {
    // TODO: Edit API Call
  };

  const handleUpdateTopping = (toppings: Topping[]) => {
    // TODO: Update Topping API Call
    // Note: If all toppings are removed use DELETE API call
  };

  return (
    <div className="cardContainer">
      <div>
        <div className="title">{pizza.name}</div>
        <ul className="toppingList">
          {pizza.toppings.map((topping: any) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ padding: "4px" }}
        >
          <option value={Options.None} disabled>
            Manage
          </option>
          <option value={Options.UpdateTopppings}>Update Toppings</option>
          <option value={Options.Edit}>Edit Pizza</option>
          <option value={Options.Delete}>Delete Pizza</option>
        </select>
        {showToppingModal && (
          <ManageToppingModal
            pizza={pizza}
            allToppings={allToppings}
            handleClose={handleCloseToppingModal}
            handleSave={handleUpdateTopping}
          />
        )}
        {showEditModal && (
          <EditModal
            type={Page.Pizzas}
            name={pizza.name}
            handleClose={handleCloseEditModal}
            handleEdit={handleEdit}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            type={Page.Pizzas}
            name={pizza.name}
            showModal={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
