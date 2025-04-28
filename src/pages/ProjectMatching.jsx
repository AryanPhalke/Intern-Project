import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import DragDrop from '../components/DragDrop';
import './ProjectMatching.css';

const ProjectMatching = () => {
  const [projects, setProjects] = useState([]);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both projects and interns
        const [projectsData, internsData] = await Promise.all([
          apiService.getProjects(),
          apiService.getInterns()
        ]);
        
        setProjects(projectsData);
        setInterns(internsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, []);
  
  const handleAssignment = async (internId, projectId) => {
    try {
      setSaveStatus({ type: 'loading', message: 'Updating assignment...' });
      
      await apiService.assignInternToProject(internId, projectId);
      
      // Update local state with new assignment
      setProjects(prevProjects => {
        return prevProjects.map(project => {
          if (project._id === projectId) {
            const assignedInterns = project.assignedInterns || [];
            if (!assignedInterns.includes(internId)) {
              return {
                ...project,
                assignedInterns: [...assignedInterns, internId]
              };
            }
          }
          return project;
        });
      });

      setSaveStatus({ type: 'success', message: 'Assignment saved successfully!' });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to save assignment. Please try again.' });
      console.error('Error saving assignment:', err);
    }
  };
  
  const handleRemoveAssignment = async (internId, projectId) => {
    try {
      setSaveStatus({ type: 'loading', message: 'Updating assignment...' });
      
      await apiService.removeInternFromProject(internId, projectId);
      
      // Update local state
      setProjects(prevProjects => {
        return prevProjects.map(project => {
          if (project._id === projectId && project.assignedInterns) {
            return {
              ...project,
              assignedInterns: project.assignedInterns.filter(id => id !== internId)
            };
          }
          return project;
        });
      });

      setSaveStatus({ type: 'success', message: 'Assignment removed successfully!' });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to remove assignment. Please try again.' });
      console.error('Error removing assignment:', err);
    }
  };
  
  // Find an intern by ID
  const getInternById = (id) => {
    return interns.find(intern => intern._id === id);
  };
  
  // Check if an intern's skills match project requirements
  const matchesRequirements = (intern, project) => {
    // Check if role matches
    const roleMatch = project.requiredRoles.includes(intern.role);
    
    // Check if at least one skill matches
    const skillMatch = intern.skills.some(skill => 
      project.requiredSkills.includes(skill)
    );
    
    return { roleMatch, skillMatch };
  };
  
  if (loading) {
    return <div className="loader">Loading project and intern data...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="project-matching-container">
      <h2>Project Matching</h2>
      <p className="description">
        Match interns to projects based on their skills and roles. Drag interns to project areas to assign them.
      </p>
      
      {saveStatus && (
        <div className={`status-message ${saveStatus.type}`}>
          {saveStatus.message}
        </div>
      )}
      
      <div className="matching-sections">
        <div className="available-interns-section">
          <h3>Available Interns</h3>
          <div className="interns-list">
            {interns.map(intern => (
              <DragDrop
                key={intern._id}
                item={intern}
                type="intern"
                onAssign={handleAssignment}
              >
                <div className="intern-card">
                  <h4>{intern.name}</h4>
                  <p><strong>Role:</strong> {intern.role}</p>
                  <div className="skills-container">
                    <p><strong>Skills:</strong></p>
                    <div className="skills-list">
                      {intern.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </DragDrop>
            ))}
          </div>
        </div>
        
        <div className="projects-section">
          <h3>Projects</h3>
          <div className="projects-list">
            {projects.map(project => (
              <div key={project._id} className="project-card">
                <div className="project-info">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  
                  <div className="requirements">
                    <p><strong>Required Roles:</strong></p>
                    <div className="requirements-list">
                      {project.requiredRoles.map((role, index) => (
                        <span key={index} className="role-tag">{role}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="requirements">
                    <p><strong>Required Skills:</strong></p>
                    <div className="requirements-list">
                      {project.requiredSkills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <p><strong>Timeline:</strong> {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                
                <div 
                  className="drop-area"
                  data-project-id={project._id}
                >
                  <h5>Assigned Interns</h5>
                  {project.assignedInterns && project.assignedInterns.length > 0 ? (
                    <div className="assigned-interns">
                      {project.assignedInterns.map(internId => {
                        const intern = getInternById(internId);
                        if (!intern) return null;
                        
                        const { roleMatch, skillMatch } = matchesRequirements(intern, project);
                        const matchClass = roleMatch && skillMatch 
                          ? 'perfect-match' 
                          : (roleMatch || skillMatch ? 'partial-match' : 'no-match');
                        
                        return (
                          <div key={internId} className={`assigned-intern ${matchClass}`}>
                            <span>{intern.name}</span>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveAssignment(internId, project._id)}
                            >
                              ×
                            </button>
                            <div className="match-indicators">
                              <span 
                                className={`match-indicator ${roleMatch ? 'match' : 'no-match'}`}
                                title={roleMatch ? 'Role matches' : 'Role doesn\'t match'}
                              >
                                R
                              </span>
                              <span 
                                className={`match-indicator ${skillMatch ? 'match' : 'no-match'}`}
                                title={skillMatch ? 'Skills match' : 'Skills don\'t match'}
                              >
                                S
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="no-interns">No interns assigned yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMatching;