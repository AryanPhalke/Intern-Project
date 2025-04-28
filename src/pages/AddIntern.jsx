import React, { useState } from 'react';
import apiService from '../services/api';
import './AddIntern.css';

const AddIntern = () => {
  const initialFormState = {
    name: '',
    role: '',
    email: '',
    joinDate: '',
    skills: [],
    funFact: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSkillInput = (e) => {
    setSkillInput(e.target.value);
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiService.addIntern(formData);
      setSubmitSuccess(true);
      setFormData(initialFormState);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding intern:', error);
      setErrors({ form: 'Failed to add intern. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-intern-container">
      <h2>Add New Intern</h2>
      
      {submitSuccess && (
        <div className="success-message">
          Intern added successfully!
        </div>
      )}
      
      {errors.form && (
        <div className="error-message">{errors.form}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'error' : ''}
          >
            <option value="">Select a role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="joinDate">Join Date *</label>
          <input
            type="date"
            id="joinDate"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            className={errors.joinDate ? 'error' : ''}
          />
          {errors.joinDate && <span className="error-text">{errors.joinDate}</span>}
        </div>
        
        <div className="form-group">
          <label>Skills *</label>
          <div className="skills-input-container">
            <input
              type="text"
              value={skillInput}
              onChange={handleSkillInput}
              placeholder="Enter a skill"
              className={errors.skills ? 'error' : ''}
            />
            <button type="button" onClick={addSkill} className="add-skill-btn">Add</button>
          </div>
          
          <div className="skills-list">
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button 
                  type="button" 
                  className="remove-skill" 
                  onClick={() => removeSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {errors.skills && <span className="error-text">{errors.skills}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="funFact">Fun Fact (Optional)</label>
          <textarea
            id="funFact"
            name="funFact"
            value={formData.funFact}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Intern'}
        </button>
      </form>
    </div>
  );
};

export default AddIntern;