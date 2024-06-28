
import React, { useContext, useState } from 'react';
import { drawingcontext } from '../App';

import { TwitterPicker } from 'react-color';

function Popup() {
     const {
        setshapetext, shapetext, insertrect, insertcircle, insertPara, insertRhombus,
        shapeSelected, insertText,setIsPopupVisible
      } = useContext(drawingcontext);

  const [textColor, setTextColor] = useState('#000000');
  const [nodeColor, setNodeColor] = useState('#ffffff');

  const helper = () => {
    const text = String(shapetext); 
    switch (shapeSelected) {
      case 'rectangle':
        insertrect(text, textColor, nodeColor);
        break;
      case 'circle':
        insertcircle(text, textColor, nodeColor);
        break;
      case 'rhombus':
        insertRhombus(text, textColor, nodeColor);
        break;
      case 'parallelogram':
        insertPara(text, textColor, nodeColor);
        break;
      case 'textfield':
        insertText(text, textColor, nodeColor);
        break;
      default:
        break;
    }
     setIsPopupVisible(false);

  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => setIsPopupVisible(false)}
        >
          x
        </button>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Node Input</h3>
          <input
            type="text"
            value={shapetext}
            onChange={(e) => setshapetext(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <h4>Text Color</h4>
          <TwitterPicker
            color={textColor}
            onChangeComplete={(color) => setTextColor(color.hex)}
          />
        </div>
        <div className="mb-4">
          <h4>Node Color</h4>
          <TwitterPicker
            color={nodeColor}
            onChangeComplete={(color) => setNodeColor(color.hex)}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={helper}>
          Insert
        </button>
      </div>
    </div>
  );
}

export default Popup;

