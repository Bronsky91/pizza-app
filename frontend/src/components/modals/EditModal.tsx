import React, { useState } from "react";
import "../../styles/components/modals/EditDeleteModals.css";
import { Page } from "../../constants";

interface EditModalProps {
  type: string;
  name: string;
  handleClose: () => void;
  handleEdit: () => void;
}

const EditModal = ({ type, name, handleClose, handleEdit }: EditModalProps) => {
  const [newName, setNewName] = useState(name);

  return (
    <div className="modalContainer">
      <div> Edit {type === Page.Pizzas ? "Pizza" : "Topping"}</div>
      <div>
        <div>New Name:</div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <div className="modalFooter">
        <button onClick={handleEdit}>Save</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
