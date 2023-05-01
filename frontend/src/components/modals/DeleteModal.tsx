import React, { useEffect, useState } from "react";
import "../../styles/components/modals/EditDeleteModals.css";
import { Page } from "../../constants";

interface DeleteModalProps {
  type: Page;
  name: string;
  showModal: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal = ({
  type,
  name,
  handleClose,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <div className="modalContainer">
      <div>Delete {type === Page.Pizzas ? "Pizza" : "Topping"}</div>
      <div>
        Are you sure you want to{" "}
        <span style={{ fontWeight: "bold" }}>Delete {name}</span>{" "}
        {type === Page.Pizzas ? "Pizza" : "Topping"}?
      </div>
      <div className="modalFooter">
        <button onClick={handleDelete}>Yes</button>
        <button onClick={handleClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
