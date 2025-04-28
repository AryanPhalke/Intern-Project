import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import TechStats from '../components/TechStats';
import './TechPreferences.css';

const TechPreferences = () => {
  const [technologies, setTechnologies] = useState([
    { id: 'react', name: 'React', selected: false },
    { id: 'angular', name: 'Angular', selected: false },
    { id: 'vue', name: 'Vue.js', selected: false },
    { id: 'node', name: 'Node.js', selected: false },
    { id: 'express', name: 'Express', selected: false },
    { id: 'mongodb', name: 'MongoDB', selected: false },
    { id: 'postgresql', name: 'PostgreSQL', selected: false },
    { id: 'typescript', name: 'TypeScript', selected: false },
    { id: 'graphql', name: 'GraphQL', selected: false },
    { id: 'tailwind', name: 'Tailwind CSS', selected: false },
    { id: 'nextjs', name: 'Next.js', selected: false },
    { id: 'firebase', name: 'Firebase', selected: false }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingError, setVotingError] = useState(null);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [showStats, setShowStats] = useState(false);
  
  // Check if the user has already voted in this session
  useEffect(() => {
    const sessionVote = sessionStorage.getItem('techVote');
    if (sessionVote) {
      setHasVoted(true);
      loadVotingStats();
    }
  }, []);
  
  const loadVotingStats = async () => {
    try {
      const data = await apiService.getAggregatedTechVotes();
      setAggregatedData(data);
      setShowStats(true);
    } catch (error) {
      console.error('Error loading voting stats:', error);
    }
  };
  
  const toggleSelection = (id) => {
    setTechnologies(techs => 
      techs.map(tech => 
        tech.id === id ? { ...tech, selected: !tech.selected } : tech
      )
    );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const selectedTechs = technologies
      .filter(tech => tech.selected)
      .map(tech => tech.name);
    
    if (selectedTechs.length === 0) {
      setVotingError('Please select at least one technology');
      return;
    }
    
    setLoading(true);
    setVotingError(null);
    
    try {
      // Mock user ID - in a real app, this would come from auth
      const internId = 'current_user_id';
      
      await apiService.submitTechVote({
        internId,
        technologies: selectedTechs
      });
      
      // Save voting status in session storage
      sessionStorage.setItem('techVote', 'true');
      setHasVoted(true);
      
      // Load stats after voting
      await loadVotingStats();
    } catch (error) {
      console.error('Error submitting vote:', error);
      setVotingError('Failed to submit your vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const resetVote = () => {
    // For demonstration purposes only - normally you wouldn't allow this
    sessionStorage.removeItem('techVote');
    setHasVoted(false);
    setShowStats(false);
    setTechnologies(techs => techs.map(tech => ({ ...tech, selected: false })));
  };
  
  return (
    <div className="tech-preferences-container">
      <h2>Technology Preferences</h2>
      <p className="description">
        Please select the technologies you would like to work with during your internship.
      </p>
      
      {hasVoted ? (
        <div className="voted-container">
          <div className="success-message">
            <p>Thank you for submitting your technology preferences!</p>
          </div>
          
          {showStats && <TechStats votingData={aggregatedData} />}
          
          <button className="reset-btn" onClick={resetVote}>
            Reset Vote (Demo Only)
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {votingError && <div className="error-message">{votingError}</div>}
          
          <div className="tech-options">
            {technologies.map(tech => (
              <div 
                key={tech.id} 
                className={`tech-option ${tech.selected ? 'selected' : ''}`}
                onClick={() => toggleSelection(tech.id)}
              >
                <input
                  type="checkbox"
                  id={tech.id}
                  checked={tech.selected}
                  onChange={() => {}} // Handled by the div click
                  className="tech-checkbox"
                />
                <label htmlFor={tech.id} className="tech-label">
                  {tech.name}
                </label>
              </div>
            ))}
          </div>
          
          <div className="selection-count">
            Selected: {technologies.filter(tech => tech.selected).length}
          </div>
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Preferences'}
          </button>
        </form>
      )}
    </div>
  );
};

export default TechPreferences;