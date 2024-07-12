import React, { createContext, useState } from 'react';
import apiRequest from '../api/apiRequest';



const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
   
    try {
      const response = await apiRequest.get('/projects/all');
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects', error);
    }
  };

 

  return (
    <ProjectContext.Provider
      value={{
        projects,
      
        loadProjects,
        
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
