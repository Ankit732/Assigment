import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableRow = ({ user, onDelete, onEdit, onSelect }) => {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      onEdit(user.id);
      setEditing(false);
    } else {
      // Start editing
      setEditing(true);
    }
  };

  const handleSelect = () => {
    onSelect(user.id);
  };

  return (
    <tr className={isEditing ? 'bg-gray-100' : 'border-b'}>
      <td>
        <input
          type="checkbox"
          onChange={handleSelect}
          className="cursor-pointer"
        />
      </td>
      <td className="px-4 py-2">{user.id}</td>
      <td className="px-4 py-2">{isEditing ? <input type="text" defaultValue={user.name} className="p-2" /> : user.name}</td>
      <td className="px-4 py-2">{isEditing ? <input type="text" defaultValue={user.email} className="p-2" /> : user.email}</td>
      <td className="px-4 py-2">{isEditing ? <input type="text" defaultValue={user.role} className="p-2" /> : user.role}</td>
      <td className="space-x-2">
        <button onClick={handleEdit} className="bg-blue-500 text-white py-1 px-2 rounded">
          {isEditing ? <span>Save</span> : <FaEdit  />}
        </button>
        <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white py-1 px-2 ml-2 rounded">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
