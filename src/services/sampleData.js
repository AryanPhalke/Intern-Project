// src/services/sampleData.js
export const sampleData = {
    interns: [
      {
        id: '1',
        name: 'John Smith',
        role: 'Frontend Developer',
        email: 'john.smith@example.com',
        joinDate: '2023-06-15',
        skills: ['React', 'JavaScript', 'CSS'],
        funFact: 'Can solve a Rubik\'s cube in under 2 minutes',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: '2',
        name: 'Emma Johnson',
        role: 'Backend Developer',
        email: 'emma.johnson@example.com',
        joinDate: '2023-07-01',
        skills: ['Node.js', 'Express', 'MongoDB'],
        funFact: 'Plays three musical instruments',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: '3',
        name: 'Michael Chen',
        role: 'Full Stack Developer',
        email: 'michael.chen@example.com',
        joinDate: '2023-05-20',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        funFact: 'Has visited 25 countries',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: '4',
        name: 'Sophia Garcia',
        role: 'UI/UX Designer',
        email: 'sophia.garcia@example.com',
        joinDate: '2023-07-15',
        skills: ['Figma', 'Adobe XD', 'UI Design', 'Wireframing'],
        funFact: 'Published a graphic novel',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: '5',
        name: 'David Kim',
        role: 'Data Analyst',
        email: 'david.kim@example.com',
        joinDate: '2023-06-01',
        skills: ['Python', 'SQL', 'Data Visualization', 'Statistics'],
        funFact: 'Amateur astrophotographer',
        avatar: 'https://via.placeholder.com/150'
      }
    ],
    
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform Redesign',
        description: 'Modernizing the user interface and improving UX of our main e-commerce platform',
        requiredSkills: ['React', 'CSS', 'UI Design'],
        requiredRoles: ['Frontend Developer', 'UI/UX Designer'],
        startDate: '2023-07-10',
        endDate: '2023-09-30',
        assignedInterns: []
      },
      {
        id: '2',
        name: 'Inventory Management API',
        description: 'Building a RESTful API for inventory tracking and management',
        requiredSkills: ['Node.js', 'Express', 'MongoDB'],
        requiredRoles: ['Backend Developer'],
        startDate: '2023-07-15',
        endDate: '2023-10-15',
        assignedInterns: []
      },
      {
        id: '3',
        name: 'Data Analytics Dashboard',
        description: 'Creating an interactive dashboard for visualizing company performance metrics',
        requiredSkills: ['React', 'Data Visualization', 'Statistics'],
        requiredRoles: ['Frontend Developer', 'Data Analyst'],
        startDate: '2023-08-01',
        endDate: '2023-11-01',
        assignedInterns: []
      }
    ],
    
    techVotes: []
  };