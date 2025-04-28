import React, { useState, useEffect } from 'react';
import './InternTable.css';

const InternTable = ({ interns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredInterns, setFilteredInterns] = useState([]);
  
  // Extract unique roles for filter dropdown
  const uniqueRoles = [...new Set(interns.map(intern => intern.role))];
  
  // Apply filters and sorting
  useEffect(() => {
    let results = [...interns];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(intern => 
        intern.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (selectedRole) {
      results = results.filter(intern => intern.role === selectedRole);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortConfig.key === 'joinDate') {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
    
    setFilteredInterns(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [interns, searchTerm, selectedRole, sortConfig]);
  
  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInterns = filteredInterns.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredInterns.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="intern-table-container">
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-filter"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredInterns.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="intern-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('name')}>
                    Name
                    {sortConfig.key === 'name' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('role')}>
                    Role
                    {sortConfig.key === 'role' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('email')}>
                    Email
                    {sortConfig.key === 'email' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('joinDate')}>
                    Join Date
                    {sortConfig.key === 'joinDate' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {currentInterns.map((intern) => (
                  <tr key={intern._id}>
                    <td>{intern.name}</td>
                    <td>{intern.role}</td>
                    <td>{intern.email}</td>
                    <td>{formatDate(intern.joinDate)}</td>
                    <td>
                      <div className="table-skills">
                        {intern.skills.map((skill, index) => (
                          <span key={index} className="table-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pagination">
            <button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              &laquo; Prev
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-btn"
            >
              Next &raquo;
            </button>
          </div>
          
          <div className="table-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredInterns.length)} of {filteredInterns.length} interns
          </div>
        </>
      ) : (
        <div className="no-results">No interns found matching your filters</div>
      )}
    </div>
  );
};

export default InternTable;