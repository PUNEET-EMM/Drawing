
import React, { useCallback, useState, createContext,useRef, useContext } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import { TwitterPicker } from 'react-color';
import { UserContext } from './context/UserContext';
import { ProjectContext } from './context/ProjectContext';


import 'reactflow/dist/style.css';
import SideBar from './components/SideBar';
import { CircleNode, ParallelogramNode, RhombusNode, TextFieldNode, RectangleNode } from './Nodes/Node';
import Popup from './components/Popup';

import { toPng } from 'html-to-image';
import AuthPopup from './components/AuthPopup';
import ProjectPopup from './components/ProjectPopup';
import apiRequest from './api/apiRequest';


const drawingcontext = createContext(null);
export { drawingcontext };




const initialEdges = [];
const initialNodes = [];

const nodeTypes = { circle: CircleNode, rhombus: RhombusNode, parallelogram: ParallelogramNode, textfield: TextFieldNode, rectangle: RectangleNode };




export default function App() {

  const {user, logoutUser} = useContext(UserContext);
  


 
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAuthPopupVisible, setIsAuthPopupVisible] = useState(false); 
  const [isProjectPopup, setIsProjectPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [projectName, setProjectName] = useState('');


  const [shapetext, setshapetext] = useState('');
  const [shapeSelected, setShapeSelected] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [backgroundVariant, setBackgroundVariant] = useState(BackgroundVariant.Dots);
  const flowRef = useRef(null);



  const [edgeColor, setEdgeColor] = useState('#000');


  const load = async (projectId) => {
    try {
      const  project = await apiRequest.get(`/projects/${projectId}`); 
      setNodes(project.data.nodes || []);
      setEdges(project.data.edges || []);    
      
      setIsProjectPopup(false); 
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge({ ...params, style: { stroke: edgeColor } }, eds)),
  //   [setEdges, edgeColor],
  // );


  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      if (!Array.isArray(eds)) {
        console.error('Edges state is not an array:', eds);
        return [];
      }
      return addEdge(params, eds);
    });
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  }, []);

  const onEdgeColorChange = useCallback((color) => {
    if (selectedEdge) {
      setEdges((eds) =>
        eds.map((e) => (e.id === selectedEdge.id ? { ...e, style: { ...e.style, stroke: color.hex } } : e))
      );
      setSelectedEdge(null);
    }
  }, [selectedEdge, setEdges]);

 
  const insertText = useCallback((text, textColor, nodeColor) => {
    const idnumber = nodes.length;
    const newelement = nodes.concat({
      id: `${idnumber + 1}`,
      type: 'textfield',
      position: { x: 450, y: 300 },
      data: { text, textColor, nodeColor },
    });
    setNodes(newelement);
  }, [nodes, setNodes]);

  const insertrect = useCallback((text, textColor, nodeColor) => {
    const idnumber = nodes.length;
    const newelement = nodes.concat({
      id: `${idnumber + 1}`,
      type: 'rectangle',
      position: { x: 0, y: 300 },
      data: { text, textColor, nodeColor },
    });
    setNodes(newelement);
  }, [nodes, setNodes]);

  const insertcircle = useCallback((text, textColor, nodeColor) => {
    const idnumber = nodes.length;
    const newelement = nodes.concat({
      id: `${idnumber + 1}`,
      type: 'circle',
      position: { x: 0, y: 300 },
      data: { text, textColor, nodeColor },
    });
    setNodes(newelement);
  }, [nodes, setNodes]);

  const insertPara = useCallback((text, textColor, nodeColor) => {
    const idnumber = nodes.length;
    const newelement = nodes.concat({
      id: `${idnumber + 1}`,
      type: 'parallelogram',
      position: { x: 0, y: 300 },
      data: { text, textColor, nodeColor },
    });
    setNodes(newelement);
  }, [nodes, setNodes]);

  const insertRhombus = useCallback((text, textColor, nodeColor) => {
    const idnumber = nodes.length;
    const newelement = nodes.concat({
      id: `${idnumber + 1}`,
      type: 'rhombus',
      position: { x: 0, y: 300 },
      data: { text, textColor, nodeColor },
    });
    setNodes(newelement);
  }, [nodes, setNodes]);


  const downloadPng = useCallback(() => {
    if (flowRef.current === null) {
      return;
    }

    toPng(flowRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Could not generate image', err);
      });
  }, [flowRef]);



  const saveProject = async () => {
    const projectData = {
      name: projectName || 'Untitled Project',
      nodes: nodes,
      edges: edges,
    };

    try {
      await apiRequest.post('/projects/save', projectData);
      alert('Project saved successfully!');
      setShowSavePopup(false); // Close the popup after saving
    } catch (error) {
      console.error('Error saving project', error);
      alert('Failed to save project');
    }
  };
 
  
  return (
    <drawingcontext.Provider value={{ insertText, insertrect, insertcircle, insertPara, insertRhombus,setIsPopupVisible ,setshapetext,shapetext,shapeSelected, setShapeSelected,setBackgroundColor,setEdgeColor,setBackgroundVariant,setIsAuthPopupVisible,setIsProjectPopup}}>
      <div className="flex h-screen w-screen">
     
        <SideBar />
        
        

      <div className="w-3/4 p-0 flex-grow  h-screen m-0 ">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onEdgeClick={onEdgeClick}

            style={{ background: backgroundColor}}
            ref={flowRef}

          >
            <Controls />
            <MiniMap />
            <Background variant={backgroundVariant} gap={12} size={1} />

          </ReactFlow>


          <button
            onClick={() => user ? logoutUser() : setIsAuthPopupVisible(true)} 
            style={{
              position: 'absolute',
              top: 16,
              right: 20,
              padding: '5px 10px',

              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
             {user ? 'Logout' : 'Login / Register'}

          </button>

          {user&& <button
           onClick={()  =>setIsProjectPopup(true)} 
            style={{
              position: 'absolute',
              top: 16,
              right: 84,
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
                 View Project

          </button>}
      
            

      


          <button       onClick={downloadPng}

            style={{
              position: 'absolute',
              top: 65,
              right: 20,
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
                    Download Project
 
          </button>



          {user&&<button
           onClick={() => setShowSavePopup(true)}
            style={{
              position: 'absolute',
              top: 65,
              right: 180,
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
                 Save Project

          </button>}


          

          
          {selectedEdge && (
            <div className="absolute top-10 left-50 p-4 bg-white shadow-lg z-10 flex-col gap-2 ">
               <h1 className='mb-2 text-300'>Choose Color</h1>
              <TwitterPicker
                color={selectedEdge.style?.stroke || '#000'}
                onChangeComplete={onEdgeColorChange}
              />
            </div>


          )}
        </div>
      </div>
      
      {isProjectPopup&&<ProjectPopup  onSelectProject={load}/>}
      {isAuthPopupVisible && <AuthPopup/>}
      {isPopupVisible && <Popup />}



      {showSavePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setShowSavePopup(false)}
            >
              x
            </button>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Save Project</h3>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={saveProject}
            >
              Save
            </button>
          </div>
        </div>
      )}

    </drawingcontext.Provider>
  );
}

