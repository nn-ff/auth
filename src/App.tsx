import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import Profile from './components/pages/Profile';
import Registration from './components/pages/Registration';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
