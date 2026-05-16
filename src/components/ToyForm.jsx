import React, { useState } from "react";


function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, likes: 0 }),
    })
      .then(r => r.json())
      .then(toy => {
        onAddToy(toy);
        setName("");
        setImage("");
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input className="input-text" type="text" name="name" placeholder="Enter a toy's name..." value={name} onChange={e => setName(e.target.value)} /><br />
        <input className="input-text" type="text" name="image" placeholder="Enter a toy's image URL..." value={image} onChange={e => setImage(e.target.value)} /><br />
        <input className="submit" type="submit" name="submit" value="Create New Toy" />
      </form>
    </div>
  );
}
export default ToyForm;