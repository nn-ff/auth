import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate('/login');
  };
  const onClickReg = () => {
    navigate('/reg');
  };
  return (
    <div className="max-w-screen-xl bg-pink-100 mx-auto py-5 flex justify-center space-x-5">
      <button onClick={onClickLogin} className="w-28 p-5 border border-black bg-green-200">
        Login
      </button>
      <button onClick={onClickReg} className="w-28 p-5 border border-black bg-blue-200">
        Register
      </button>
    </div>
  );
};

export default Login;
