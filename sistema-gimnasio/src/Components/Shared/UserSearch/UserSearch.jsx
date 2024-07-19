import React from 'react';
import './UserSearch.css';

const UserSearch = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Buscar usuarios por email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="user-search-input"
      />
    </div>
  );
};

export default UserSearch;
