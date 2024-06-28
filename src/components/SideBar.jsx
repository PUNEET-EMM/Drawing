import React, { useContext, useState } from 'react';
import { drawingcontext } from '../App';
import { TwitterPicker } from 'react-color';

const SideBar = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [isEdgeColorPickerVisible, setIsEdgeColorPickerVisible] = useState(false);
  const [isBackgroundColorPickerVisible, setIsBackgroundColorPickerVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { setIsPopupVisible, setShapeSelected ,setBackgroundColor ,setEdgeColor} = useContext(drawingcontext);

  const [color, setColor] = useState('#000');
  
  const handleChangeComplete = (color) => {
    setColor(color.hex);
    console.log(color.hex)
    setEdgeColor(color.hex);
  };

  const insertrectHelper = async () => {
    await setShapeSelected('rectangle');
    setIsPopupVisible(true);
  };
  const insertcircleHelper = async () => {
    await setShapeSelected('circle');
    setIsPopupVisible(true);
  };
  const insertRhombusHelper = async () => {
    await setShapeSelected('rhombus');
    setIsPopupVisible(true);
  };
  const insertParaHelper = async () => {
    await setShapeSelected('parallelogram');
    setIsPopupVisible(true);
  };
  const insertTextHelper = async () => {
    await setShapeSelected('textfield');
    setIsPopupVisible(true);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-md z-20 sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <div className={` bg-[#E6FFCC] fixed  top-0 left-0 h-full z-10 bg-primary-blue-theme transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:relative sm:w-1/4 lg:w-1/4 overflow-y-scroll pt-24`}>
        <h6 className="text-300 text-lg font-medium ml-8 mb-4">Shapes</h6>
        <div className="flex flex-col align-middle justify-center p-4 bg-purple-300 mx-8 mb-4 bg-secondary-blue-theme rounded-md">
          <div className="flex flex-wrap items-center flex-col">
            <div className="bg-white h-8 w-20 rounded-md mt-4 cursor-grab" onClick={insertrectHelper}></div>
            <div className="bg-white h-12 w-16 rounded-full mt-4 cursor-grab" onClick={insertcircleHelper}></div>
            <div className="bg-white h-12 w-12 transform rotate-45 mt-8 cursor-grab" onClick={insertRhombusHelper}></div>
            <div className="bg-white h-8 w-20 transform skew-x-20 mt-8 cursor-grab" onClick={insertParaHelper}></div>
            <div className="w-20 h-8 bg-transparent border border-white text-white flex items-center justify-center rounded-md mt-4 cursor-grab" onClick={insertTextHelper}>
              Text
            </div>
          </div>
        </div>
        <h6 className="text-300 text-lg font-medium ml-8 mb-4">Customize the Color</h6>
        <div className="p-4 bg-purple-300 mx-8 mb-4 bg-secondary-blue-theme rounded-md flex flex-col">
          <div className="flex flex-col gap-3 justify-between mb-2">
            <h4 className="font-normal text-white">Edge Color</h4>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => setIsEdgeColorPickerVisible(!isEdgeColorPickerVisible)}>
              {isEdgeColorPickerVisible ? 'Hide' : 'Show'} Color Picker
            </button>
            {isEdgeColorPickerVisible && (
              <div className="flex flex-shrink mt-2">
                <TwitterPicker
                  color={textColor}
                  onChangeComplete={handleChangeComplete}
                />
              </div>
            )}
          </div>
        </div>
        <h6 className="text-300 text-lg font-medium ml-8 mb-4">Customize the Canvas</h6>
        <div className="bg-purple-300 p-4 mx-8 mb-4 bg-secondary-blue-theme rounded-md flex flex-col">
          <div className="flex flex-col gap-2 justify-between mb-2">
            <h4 className="font-normal text-white">Background</h4>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => setIsBackgroundColorPickerVisible(!isBackgroundColorPickerVisible)}>
              {isBackgroundColorPickerVisible ? 'Hide' : 'Show'} Color Picker
            </button>
            {isBackgroundColorPickerVisible && (
              <div className="flex flex-shrink mt-2">
                <TwitterPicker
                 
                  onChangeComplete={(color) => setBackgroundColor(color.hex)}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mb-2">
            <h4 className="font-normal text-white">Variant</h4>
            <select className="ml-4 bg-gray-700 text-white font-medium">
              <option value="lines">Line</option>
              <option value="dots">Dots</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;


