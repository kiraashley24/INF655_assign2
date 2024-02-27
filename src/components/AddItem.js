import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";

const AddItem = ({ onAddItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subChores, setSubChores] = useState([]);
  const [subChoreInput, setSubChoreInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || subChores.length === 0 || subChores.some(sub => !sub.trim())) {
      alert('Please enter a title for the chore and sub-chores');
      return;
    }
    onAddItem({ title, description, subChores });
    setTitle('');
    setDescription('');
    setSubChores([]);
    setSubChoreInput('');
  };

  const handleAddSubChore = () => {
    if (subChoreInput.trim()) {
      setSubChores([...subChores, subChoreInput]);
      setSubChoreInput('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Chore:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter chore title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Details:</label>
        <input
          id="description"
          type="text"
          placeholder="Enter chore details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subChore">Sub-Chores:</label>
        <div>
          {subChores.map((subChore, index) => (
            <div key={index}>
              <span>{subChore}</span>
            </div>
          ))}
        </div>
        <input
          id="subChore"
          type="text"
          placeholder="Enter sub-chore"
          value={subChoreInput}
          onChange={(e) => setSubChoreInput(e.target.value)}
        />
        <button type="button" onClick={handleAddSubChore}>Add Sub-Chore</button>
      </div>
      <button type="submit">Add Chore <IoIosAddCircle /></button>
    </form>
  );
};

export default AddItem;