import React, { useState } from 'react';
import TableRow from './TableRow';

const Table = ({ data, onDelete, onEdit, onSelect }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allIds = data.map(user => user.id);
    onSelect(selectAll ? [] : allIds);
  };

  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="table-auto w-full">
        {/* Table Headers */}
        <thead>
          <tr className="bg-gray-200">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              onDelete={onDelete}
              onEdit={onEdit}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
