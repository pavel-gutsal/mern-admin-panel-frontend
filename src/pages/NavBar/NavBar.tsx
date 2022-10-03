import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './NavBar.scss';

export const NavBar = () => {
  const { setUser } = useContext(AuthContext);
  return (
    <div className="NavBar">
      <button
        className="NavBar__logOut"
        type="button"
        onClick={() => {
          setUser(null);
        }}
      >
        LogOut
      </button>
    </div>
  );
};
