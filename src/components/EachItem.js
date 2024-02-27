import React, { useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { FiEdit } from "react-icons/fi";

const EachItem = ({ item, onCheck, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [titleChecked, setTitleChecked] = useState(item.titleChecked || false);
  const [descriptionChecked, setDescriptionChecked] = useState(item.descriptionChecked || false);
  const [subChoreChecked, setSubChoreChecked] = useState(item.subChoreChecked || false);

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
              checked={titleChecked}
              onChange={() => setTitleChecked(!titleChecked)}
            />
            <h3 className={titleChecked ? 'item-title checked' : 'item-title'}>
              {item.title}
            </h3>
          </div>
          <div className="checkboxes">
            <input
              type="checkbox"
              checked={descriptionChecked}
              onChange={() => setDescriptionChecked(!descriptionChecked)}
            />
            <p className={descriptionChecked ? 'item-description checked' : 'item-description'}>
              {item.description}
            </p>
          </div>
          {item.subChore && (
            <div className="checkboxes">
              <input
                type="checkbox"
                checked={subChoreChecked}
                onChange={() => setSubChoreChecked(!subChoreChecked)}
              />
              <p className={subChoreChecked ? 'item-subchore checked' : 'item-subchore'}>
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