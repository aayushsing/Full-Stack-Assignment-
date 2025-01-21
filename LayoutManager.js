import React, { useState, useEffect } from "react";
import DraggableCard from "./DraggableCard";
import { firestore } from "../firebaseConfig";
import "./styles/App.css";

const LayoutManager = () => {
  const [cards, setCards] = useState([]);
  const [layoutId, setLayoutId] = useState("user-default-layout"); // Unique ID for saving/loading layout

  // Fetch saved layout from Firebase
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const doc = await firestore.collection("layouts").doc(layoutId).get();
        if (doc.exists) {
          setCards(doc.data().cards || []);
        } else {
          // Set default cards layout if no saved layout exists
          setCards([
            { id: 1, title: "Card 1", thumbnail: "https://via.placeholder.com/150" },
            { id: 2, title: "Card 2", thumbnail: "https://via.placeholder.com/150" },
            { id: 3, title: "Card 3", thumbnail: "https://via.placeholder.com/150" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching layout:", error);
      }
    };

    fetchLayout();
  }, [layoutId]);

  // Save layout to Firebase
  const saveLayout = async () => {
    try {
      await firestore.collection("layouts").doc(layoutId).set({ cards });
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  // Reorder cards when dragged
  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  return (
    <div className="layout-manager">
      <h2>Manage Your Layout</h2>
      <div className="card-container">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            index={index}
            data={card}
            moveCard={moveCard}
          />
        ))}
      </div>
      <div className="layout-buttons">
        <button onClick={saveLayout}>Save Layout</button>
        <button onClick={() => window.location.reload()}>Reload Layout</button>
      </div>
    </div>
  );
};

export default LayoutManager;
