
import { Handle, Position } from 'reactflow';

const CircleNode = ({ data }) => {
  const customNodeStylesCircle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
   
    padding: '1rem',
    height: "5rem",
    width: "5rem",
    borderRadius: '50%',
    border: `1px solid red`,
    background: data.nodeColor || 'red',
    color: data.textColor || 'red',
  };
  return (
    <div style={customNodeStylesCircle}>
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <div>{data.text}</div>
      <Handle type="source" position="bottom" id="a" />
    </div>
  );
};

const RhombusNode = ({ data }) => {
  const textRhombus = {
    transform: 'rotate(-45deg)'
  };
  const customNodeStylesRhombus = {
    // color: 'red',
    textAlign: 'center',
    height: '5rem',
    width: '5rem',
    display: 'flex',
    alignItems: 'center',
    transform: 'rotate(45deg)',
    justifyContent: 'center',
    border: `1px solid red`,
    background: data.nodeColor || 'red',
    color: data.textColor || 'red',
  };
  return (
    <div style={customNodeStylesRhombus}>
      <Handle type="target" position="top" style={{ borderRadius: 0, position: 'absolute', left: '0' }} />
      <Handle type="source" id="a" position="left" style={{ borderRadius: 0, position: 'absolute', top: '100%' }} />
      <div style={textRhombus}>{data.text}</div>
      <Handle type="source" id="b" position="right" style={{ borderRadius: 0, position: 'absolute', top: '0%' }} />
      <Handle type="source" id="c" position="bottom" style={{ borderRadius: 0, position: 'absolute', left: '100%' }} />
    </div>
  );
};

const ParallelogramNode = ({ data }) => {
  const textparallelogram = {
    transform: 'skew(-20deg)'
  };
  const customNodeStylesParallelogram = {
    height: '5rem',
    width: '8rem',
    padding: '10px 30px',
    borderRadius: '2px',
    transform: 'skew(20deg)',
    border: `1px solid red`,
    background: data.nodeColor || 'red',
    color: data.textColor || 'red',
  };
  return (
    <div style={customNodeStylesParallelogram}>
      <Handle type="target" className="handle_button" position="top" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} />
      <Handle type="target" className="handle_button" id="a" position="left" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} />
      <div style={textparallelogram}>{data.text}</div>
      <Handle type="source" id="b" position="right" className="handle_button" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} />
      <Handle type="source" id="c" position="bottom" className="handle_button" style={{ borderRadius: 0, transform: 'skew(-20deg)' }} />
    </div>
  );
};

const TextFieldNode = ({ data }) => {
  const customNodeStylesTextField = {
    height: '5rem',
    width: '5rem',
    padding: '1rem',
    borderRadius: '2px',
    border: `1px solid red`,
    background: data.nodeColor || 'red',
    color: data.textColor || 'red',
  };
  return (
    <div style={customNodeStylesTextField}>
      <div>{data.text}</div>
    </div>
  );
};

const RectangleNode = ({ data }) => {
  const customNodeStylesRectangle = {
    height: '5rem',
    width: '8rem',
    padding: '1rem',
    borderRadius: '2px',
    border: `1px solid red`,
    background: data.nodeColor || 'red',
    color: data.textColor || 'red',
  };
  return (
    <div style={customNodeStylesRectangle}>
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <Handle type="source" id="a" position="left" style={{ borderRadius: 0 }} />
      <div>{data.text}</div>
      <Handle type="source" id="b" position="right" style={{ borderRadius: 0 }} />
      <Handle type="source" id="c" position="bottom" style={{ borderRadius: 0 }} />
    </div>
  );
};

export { CircleNode, RhombusNode, ParallelogramNode, TextFieldNode, RectangleNode };
