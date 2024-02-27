import React from 'react';
import EachItem from './EachItem';

const Items = ({ items, onCheck, onDelete, onEdit }) => {
  return (
    <div>
      {items.map((item) => (
        <EachItem
          key={item.id}
          item={item}
          onCheck={onCheck}
          onDelete={onDelete}
          onEdit={onEdit} // Make sure onEdit is passed here
        />
      ))}
    </div>
  );
};

export default Items;
