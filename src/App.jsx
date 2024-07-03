
import React, { useCallback, useState, createContext } from 'react';
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


import 'reactflow/dist/style.css';
import SideBar from './components/SideBar';
import { CircleNode, ParallelogramNode, RhombusNode, TextFieldNode, RectangleNode } from './Nodes/Node';
import Popup from './components/Popup';

const drawingcontext = createContext(null);
export { drawingcontext };

const initialEdges = [];

const nodeTypes = { circle: CircleNode, rhombus: RhombusNode, parallelogram: ParallelogramNode, textfield: TextFieldNode, rectangle: RectangleNode };




export default function App() {
  const initialNodes = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [shapetext, setshapetext] = useState('');
  const [shapeSelected, setShapeSelected] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [backgroundVariant, setBackgroundVariant] = useState(BackgroundVariant.Dots);



  const [edgeColor, setEdgeColor] = useState('#000');

  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, style: { stroke: edgeColor } }, eds)),
    [setEdges, edgeColor],
  );


  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );




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
  

  return (
    <drawingcontext.Provider value={{ insertText, insertrect, insertcircle, insertPara, insertRhombus,setIsPopupVisible ,setshapetext,shapetext,shapeSelected, setShapeSelected,setBackgroundColor,setEdgeColor,setBackgroundVariant}}>
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
          >
            <Controls />
            <MiniMap />
            <Background variant={backgroundVariant} gap={12} size={1} />

          </ReactFlow>
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
      {isPopupVisible && <Popup />}
    </drawingcontext.Provider>
  );
}

