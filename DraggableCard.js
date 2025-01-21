import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableCard = ({ id, index, moveCard, data }) => {
  const [, ref] = useDrop({
    accept: "CARD",
    hover(item) {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: "CARD",
    item: { id, index },
  });

  return (
    <div ref={(node) => drag(ref(node))} className="card">
      <img src={data.thumbnail} alt={data.title} />
      <p>{data.title}</p>
    </div>
  );
};

export default DraggableCard;
