import React, { useState } from "react";
import "../../styles/components/modals/EditDeleteModals.css";
import { Page } from "../../constants";

interface AddModalProps {
  type: string;
  handleClose: () => void;
  handleSaveCard: (name: string) => void;
}

const AddModal = ({ type, handleClose, handleSaveCard }: AddModalProps) => {
  const [name, setName] = useState("");

  return (
    <div className="modalContainer">
      <div> Add {type === Page.Pizzas ? "Pizza" : "Topping"}</div>
      <div>
        <div>Name:</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <div className="modalFooter">
        <button onClick={() => handleSaveCard(name)}>Create</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddModal;
