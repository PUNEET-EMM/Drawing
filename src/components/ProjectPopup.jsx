import React, { useContext, useEffect } from 'react';
import { drawingcontext } from '../App';
import { ProjectContext } from '../context/ProjectContext';


function ProjectPopup({ onSelectProject }) {
  const { setIsProjectPopup } = useContext(drawingcontext);
  const { projects, loadProjects  } = useContext(ProjectContext);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => setIsProjectPopup(false)}
        >
     
        
          x
        </button>
        <h3 className="text-lg font-medium mb-4">Previous Projects</h3>
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="mb-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full text-left"
                onClick={() => onSelectProject(project._id)}
              >
                {project.name}
              </button>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}

export default ProjectPopup;
