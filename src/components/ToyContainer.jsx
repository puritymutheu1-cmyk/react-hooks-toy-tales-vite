import React from "react";
import ToyCard from "./ToyCard";

// Renders all toy cards
function ToyContainer({ toys, onDonate, onLike }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDonate={onDonate}
          onLike={onLike}
        />
      ))}
    </div>
  );
}

export default ToyContainer;