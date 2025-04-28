import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ intern }) => {
  const [showFunFact, setShowFunFact] = useState(false);

  const toggleFunFact = () => {
    setShowFunFact(!showFunFact);
  };

  if (!intern) return <div className="profile-card loading">Loading...</div>;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image">
          {intern.avatar ? (
            <img src={intern.avatar} alt={`${intern.name}'s avatar`} />
          ) : (
            <div className="default-avatar">{intern.name.charAt(0)}</div>
          )}
        </div>
        <h3>{intern.name}</h3>
      </div>

      <div className="profile-info">
        <p><strong>Role:</strong> {intern.role}</p>
        <p><strong>Email:</strong> {intern.email}</p>
        <p><strong>Joined:</strong> {new Date(intern.joinDate).toLocaleDateString()}</p>
        
        <div className="skills-container">
          <strong>Skills:</strong>
          <div className="skills-list">
            {intern.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        
        {showFunFact && (
          <div className="fun-fact">
            <p><strong>Fun Fact:</strong> {intern.funFact || "No fun fact available"}</p>
          </div>
        )}
        
        <button className="fun-fact-btn" onClick={toggleFunFact}>
          {showFunFact ? "Hide Fun Fact" : "Show Fun Fact"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;