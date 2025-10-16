
import React, { useState } from "react";
import "./Widgets.css";

export default function Widgets({ categories, onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (selectedCategory && title && text) {
      onAdd(selectedCategory, { title, text });
      setTitle("");
      setText("");
    }
  };

  return (
    <div className="widget-form">
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input placeholder="Widget name" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Widget text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAdd}>+ Add Widget</button>
    </div>
  );
}

