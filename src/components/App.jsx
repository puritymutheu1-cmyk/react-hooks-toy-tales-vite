import React, { useState, useEffect } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";



function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => r.json())
      .then(setToys);
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" })
      .then(() => setToys(toys => toys.filter(t => t.id !== id)));
  }

  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then(r => r.json())
      .then(updated => setToys(toys => toys.map(t => t.id === updated.id ? updated : t)));
  }

  function handleAddToy(newToy) {
    setToys(toys => [...toys, newToy]);
  }

  return (
    <div>
      {/* header */}
      <div className="buttonContainer">
        <button onClick={() => setShowForm(s => !s)}>Add a Toy</button>
      </div>
      {showForm && <ToyForm onAddToy={handleAddToy} />}
      <div id="toy-collection">
        {toys.map(toy => (
          <ToyCard key={toy.id} toy={toy} onDelete={handleDelete} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}


export default App;
