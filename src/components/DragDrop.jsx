import React, { useState } from 'react';
import './DragDrop.css';

const DragDrop = ({ children, item, type, onAssign }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemId', item._id);
    e.dataTransfer.setData('itemType', type);
    setIsDragging(true);
    
    // Create a "ghost" image for dragging
    const ghostElement = document.createElement('div');
    ghostElement.innerHTML = item.name;
    ghostElement.className = 'drag-ghost';
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    
    // Remove the ghost element after it's no longer needed
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  return (
    <div 
      className={`draggable ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
};

// Add event listeners to handle drop zones
document.addEventListener('DOMContentLoaded', () => {
  const handleDragOver = (e) => {
    // Check if the target is a drop area or a child of a drop area
    const dropArea = e.target.closest('.drop-area');
    if (dropArea) {
      e.preventDefault();
      dropArea.classList.add('drag-over');
    }
  };
  
  const handleDragLeave = (e) => {
    const dropArea = e.target.closest('.drop-area');
    if (dropArea && !dropArea.contains(e.relatedTarget)) {
      dropArea.classList.remove('drag-over');
    }
  };
  
  const handleDrop = (e) => {
    const dropArea = e.target.closest('.drop-area');
    if (dropArea) {
      e.preventDefault();
      dropArea.classList.remove('drag-over');
      
      const itemId = e.dataTransfer.getData('itemId');
      const itemType = e.dataTransfer.getData('itemType');
      const projectId = dropArea.getAttribute('data-project-id');
      
      if (itemType === 'intern' && projectId) {
        // Find the assignment function which was passed as a prop
        const assignEvent = new CustomEvent('assign-intern', {
          detail: { internId: itemId, projectId }
        });
        document.dispatchEvent(assignEvent);
      }
    }
  };
  
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('dragleave', handleDragLeave);
  document.addEventListener('drop', handleDrop);
  
  // Clean up listeners when component unmounts
  return () => {
    document.removeEventListener('dragover', handleDragOver);
    document.removeEventListener('dragleave', handleDragLeave);
    document.removeEventListener('drop', handleDrop);
  };
});

export default DragDrop;