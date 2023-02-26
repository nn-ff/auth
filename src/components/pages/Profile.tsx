import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Exit } from '../../store/slice/userSlice';

const Profile: React.FC = () => {
  const { current } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickLogout = () => {
    navigate('/');
    dispatch(Exit());
  };
  return (
    <div className="max-w-screen-xl bg-pink-100 mx-auto py-5 text-center">
      <h1>Hello, {current?.login}</h1>
      <div>your email {current?.email}</div>
      <button onClick={onClickLogout} className="w-60 p-1 m-5 border border-black bg-red-200">
        Выйти
      </button>
    </div>
  );
};

export default Profile;
