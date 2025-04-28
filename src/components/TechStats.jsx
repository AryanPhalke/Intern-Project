import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './TechStats.css';

const COLORS = [
  '#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#673ab7', 
  '#3f51b5', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b'
];

const TechStats = ({ votingData }) => {
  const [chartType, setChartType] = React.useState('pie');
  
  if (!votingData || votingData.length === 0) {
    return <div className="no-data">No voting data available</div>;
  }
  
  // Sort data for better visualization
  const sortedData = [...votingData].sort((a, b) => b.count - a.count);
  
  return (
    <div className="tech-stats-container">
      <h3>Technology Preferences Results</h3>
      
      <div className="chart-controls">
        <button 
          className={`chart-btn ${chartType === 'pie' ? 'active' : ''}`}
          onClick={() => setChartType('pie')}
        >
          Pie Chart
        </button>
        <button 
          className={`chart-btn ${chartType === 'bar' ? 'active' : ''}`}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
        <button 
          className={`chart-btn ${chartType === 'list' ? 'active' : ''}`}
          onClick={() => setChartType('list')}
        >
          List View
        </button>
      </div>
      
      <div className="chart-container">
        {chartType === 'pie' && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sortedData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
        
        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Votes" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {chartType === 'list' && (
          <div className="stats-list">
            <div className="list-headers">
              <span className="tech-name">Technology</span>
              <span className="tech-votes">Votes</span>
              <span className="tech-percentage">Percentage</span>
            </div>
            {sortedData.map((item, index) => (
              <div key={index} className="tech-stat-item">
                <span className="tech-name">{item.name}</span>
                <span className="tech-votes">{item.count}</span>
                <div className="percentage-bar-container">
                  <div 
                    className="percentage-bar" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  ></div>
                  <span className="tech-percentage">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStats;