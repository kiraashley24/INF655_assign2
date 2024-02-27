// App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import Items from './components/Items';
import ItemDescript from './components/ItemDescript';
import AddItem from './components/AddItem';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : ItemDescript;
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleAddItem = ({ title, description }) => {
    const newItem = {
      id: items.length + 1,
      title,
      description,
      checked: false,
      subTasks: [],
    };
    setItems([...items, newItem]);
  };

  const handleAddSubTask = (parentId, { title }) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        const newSubTask = { id: uuidv4(), title, completed: false };
        return { ...item, subTasks: [...item.subTasks, newSubTask] };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleCheckSubTask = (parentId, subTaskId) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        const updatedSubTasks = item.subTasks.map((subTask) =>
          subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
        );
        return { ...item, subTasks: updatedSubTasks };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteSubTask = (parentId, subTaskId) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        const updatedSubTasks = item.subTasks.filter((subTask) => subTask.id !== subTaskId);
        return { ...item, subTasks: updatedSubTasks };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'completed') {
      return item.checked;
    } else if (filter === 'incomplete') {
      return !item.checked;
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1>Today's Chore List</h1>
      <div className="card">
        <div className="card-body">
          <h2>Add New Chore</h2>
          <AddItem onAddItem={handleAddItem} />
        </div>
      </div>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Chores</option>
            <option value="completed">Completed Chores</option>
            <option value="incomplete">Incomplete Chores</option>
          </select>
        </label>
      </div>
      <Items
        items={filteredItems}
        onCheck={handleCheck}
        onDelete={handleDelete}
        onAddSubTask={handleAddSubTask}
        onCheckSubTask={handleCheckSubTask}
        onDeleteSubTask={handleDeleteSubTask}
      />
    </div>
  );
};

export default App;
