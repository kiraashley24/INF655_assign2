import React, { useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { FiEdit } from "react-icons/fi";

const EachItem = ({ item, onCheck, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);

  const handleSave = () => {
    onEdit(item.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="item-card">
      {!isEditing ? (
        <>
          <div className="checkboxes">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onCheck(item.id)}
            />
            <h3 className={item.checked ? 'item-title checked' : 'item-title'}>
              {item.title}
            </h3>
          </div>
          <div className="checkboxes">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onCheck(item.id)}
            />
            <p className={item.checked ? 'item-description checked' : 'item-description'}>
              {item.description}
            </p>
          </div>
          {item.subChore && (
            <div className="checkboxes">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheck(item.id)}
              />
              <p className={item.checked ? 'item-subchore checked' : 'item-subchore'}>
                Sub-Chore: {item.subChore}
              </p>
            </div>
          )}
          <button className="edit-button" onClick={() => setIsEditing(true)}><FiEdit /></button>
          <button className="delete-button" onClick={() => onDelete(item.id)}>
            <RiDeleteBin2Line />
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default EachItem;
