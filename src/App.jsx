import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../Functions/Table';
import Pagination from '../Functions/Pagination';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  const maxPage = 5; // Set the maximum number of pages

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePageChange = (page) => {
    // Ensure not to go beyond the maximum page
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (userId) => {
    // Delete user logic
    // This is in-memory, so you can filter the users array
    setUsers(users.filter(user => user.id !== userId));
    setSelectedRows(selectedRows.filter(id => id !== userId));
  };

  const handleEdit = (userId) => {
    // Edit user logic
    // This is in-memory, so you can update the users array
    console.log(`Editing user with ID ${userId}`);
  };

  const handleSelect = (userId) => {
    // Select/Deselect user logic
    // This is in-memory, so you can update the selectedRows array
    const newSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter(id => id !== userId)
      : [...selectedRows, userId];

    setSelectedRows(newSelectedRows);
  };

  const handleSearch = (query) => {
    // Handle search logic
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleDeleteSelected = () => {
    // Delete selected rows logic
    // This is in-memory, so you can filter the users array
    setUsers(users.filter(user => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  // Pagination Logic
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={() => handleSearch('')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <Table
        data={currentItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSelect={handleSelect}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Delete Selected Button */}
      <button onClick={handleDeleteSelected} className="bin bg-red-500 text-white py-2 px-4 rounded mt-4">
        Delete Selected
      </button>

      {/* Display Total Rows */}
      <p className="mt-4">Total Rows: {filteredUsers.length}</p>
    </div>
  );
};

export default App;
