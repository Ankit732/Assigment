import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination mt-4 flex items-center space-x-2">
      <button onClick={() => onPageChange(1)} className="first-page bg-gray-300 py-1 px-2 rounded">
        <FaAngleDoubleLeft />
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} className="previous-page bg-gray-300 py-1 px-2 rounded">
        <FaAngleLeft />
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`page-number bg-gray-300 py-1 px-2 rounded ${currentPage === index + 1 ? 'font-bold' : ''}`}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} className="next-page bg-gray-300 py-1 px-2 rounded">
        <FaAngleRight />
      </button>
      <button onClick={() => onPageChange(totalPages)} className="last-page bg-gray-300 py-1 px-2 rounded">
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
