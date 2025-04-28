import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InternList from './pages/InternList';
import AddIntern from './pages/AddIntern';
import TechPreferences from './pages/TechPreferences';
import ProjectMatching from './pages/ProjectMatching';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">Intern Management System</div>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Intern Directory</Link>
            <Link to="/add" className="nav-link">Add Intern</Link>
            <Link to="/tech" className="nav-link">Tech Preferences</Link>
            <Link to="/projects" className="nav-link">Project Matching</Link>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<InternList />} />
            <Route path="/add" element={<AddIntern />} />
            <Route path="/tech" element={<TechPreferences />} />
            <Route path="/projects" element={<ProjectMatching />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Intern Management System - MERN Stack Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;