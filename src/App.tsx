import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { Register } from './pages/Register/Register';
import { BasicLayout } from './pages/BasicLayout/BasicLayout';
import { DashBoard } from './pages/DashBoard/DashBoard';
import './App.scss';

export const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={user ? (<DashBoard />) : (<Navigate to="/signin" replace />)} />
        <Route path="signin" element={!user ? (<Register />) : (<Navigate to="/" replace />)} />
      </Route>
    </Routes>
  );
};

export default App;
