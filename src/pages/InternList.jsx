import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import ProfileCard from '../components/ProfileCard';
import InternTable from '../components/InternTable';
import './InternList.css';

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        setLoading(true);
        const data = await apiService.getInterns();
        setInterns(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch interns. Please try again later.');
        setLoading(false);
        console.error('Error fetching interns:', err);
      }
    };

    fetchInterns();
  }, []);

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'cards' ? 'table' : 'cards'));
  };

  if (loading) {
    return <div className="loader">Loading interns...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="intern-list-container">
      <div className="list-header">
        <h1>Intern Directory</h1>
        <button className="view-toggle-btn" onClick={toggleViewMode}>
          {viewMode === 'cards' ? 'Switch to Table View' : 'Switch to Card View'}
        </button>
      </div>

      {viewMode === 'cards' ? (
        <div className="cards-container">
          {interns.length > 0 ? (
            interns.map(intern => (
              <ProfileCard key={intern._id} intern={intern} />
            ))
          ) : (
            <p className="no-results">No interns found. Add some interns to get started!</p>
          )}
        </div>
      ) : (
        <InternTable interns={interns} />
      )}
    </div>
  );
};

export default InternList;