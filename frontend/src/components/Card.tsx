import React, { useEffect, useState } from "react";
import "../styles/components/Card.css";
import { Pizza, Topping } from "../interfaces/pizza";
import DeleteModal from "./modals/DeleteModal";
import { Page } from "../constants";
import EditModal from "./modals/EditModal";
import ManageToppingModal from "./modals/ManageToppingModal";

interface CardProps {
  item: Pizza | Topping;
  type: Page;
  allToppings?: Topping[];
  handleEdit: (id: number, newName: string) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleUpdateTopping?: (id: number, toppings: Topping[]) => Promise<void>;
}

enum Options {
  None = "none",
  UpdateTopppings = "update toppings",
  Edit = "edit",
  Delete = "delete",
}

const Card = ({
  item,
  type,
  allToppings,
  handleEdit,
  handleDelete,
  handleUpdateTopping,
}: CardProps) => {
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

  return (
    <div className="cardContainer">
      <div>
        <div className="title">{item.name}</div>
        {"toppings" in item ? (
          <ul className="toppingList">
            {item.toppings.map((topping: any) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        ) : null}
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
          {"toppings" in item && (
            <option value={Options.UpdateTopppings}>Update Toppings</option>
          )}
          <option value={Options.Edit}>
            Edit {type === Page.Pizzas ? "Pizza" : "Topping"}
          </option>
          <option value={Options.Delete}>
            Delete {type === Page.Pizzas ? "Pizza" : "Topping"}
          </option>
        </select>
        {showToppingModal &&
          allToppings &&
          "toppings" in item &&
          handleUpdateTopping && (
            <ManageToppingModal
              pizza={item}
              allToppings={allToppings}
              handleClose={handleCloseToppingModal}
              handleSave={handleUpdateTopping}
            />
          )}
        {showEditModal && (
          <EditModal
            type={type}
            id={item.id}
            name={item.name}
            handleClose={handleCloseEditModal}
            handleEdit={handleEdit}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            type={type}
            id={item.id}
            name={item.name}
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
