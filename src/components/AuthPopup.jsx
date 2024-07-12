import React, { useContext, useState } from 'react';
import { drawingcontext } from '../App';
import { UserContext } from '../context/UserContext';

function AuthPopup() {
  const {user, loginUser, registerUser, logoutUser} = useContext(UserContext);
  const { setIsAuthPopupVisible } = useContext(drawingcontext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (isLogin) {
       loginUser(username, email, password);
      console.log("Success");
    } else {
       registerUser(username, email, password);

    }
    setIsAuthPopupVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => setIsAuthPopupVisible(false)}
        >
          x
        </button>
        <h3 className="text-lg font-medium mb-4">{isLogin ? 'Login' : 'Register'}</h3>
        <div className="mb-4">
          
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
        
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleAuth}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <button
          className="text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need to register?' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthPopup;

