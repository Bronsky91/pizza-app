import React, { useEffect, useState } from "react";
import "../styles/components/Card.css";
import plus from "../plus.png";
import { Page } from "../constants";

interface AddCardProps {
  type: Page;
  handleAddCard: () => void;
}

const AddCard = ({ type, handleAddCard }: AddCardProps) => {
  return (
    <div className="cardContainer addCardContainer" onClick={handleAddCard}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        Add {type === Page.Pizzas ? "Pizza" : "Topping"}
      </div>
      <img src={plus} alt="plus sign" className="plusImg" />
    </div>
  );
};

export default AddCard;
