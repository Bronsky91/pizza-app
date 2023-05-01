import React, { useEffect, useState } from "react";
import "../styles/components/Card.css";
import { Pizza } from "../interfaces/pizza";
import DeleteModal from "./modals/DeleteModal";
import { Page } from "../constants";
import EditModal from "./modals/EditModal";

interface CardProps {
  pizza: Pizza;
}

enum Options {
  None = "none",
  UpdateTopppings = "update toppings",
  Edit = "edit",
  Delete = "delete",
}

const Card = ({ pizza }: CardProps) => {
  const [selectedOption, setSelectedOption] = useState<Options>(Options.None);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectedOption === Options.Delete) {
      setShowDeleteModal(true);
    }
    if (selectedOption === Options.Edit) {
      setShowEditModal(true);
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

  const handleDelete = () => {
    // TODO: Delete API Call
  };

  const handleEdit = () => {
    // TODO: Edit API Call
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
