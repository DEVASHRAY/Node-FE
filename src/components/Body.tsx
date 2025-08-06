import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

const Body = () => {
  return (
    <div className='h-[100vh]'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
