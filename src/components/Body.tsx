import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { userAtom } from '../atom/store';
import { BASE_URL } from '../utils/constants';
import NavBar from './NavBar';

const Body = () => {
  const [user, setUser] = useAtom(userAtom);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      if (res.data.data) {
        setUser(res.data.data);
      } else {
        setUser(undefined);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 401 || err.status === 403) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (user === undefined) {
      fetchUser();
    }
  }, []);

  return (
    <div className='h-[100vh]'>
      <div className='sticky top-0 z-50'>
        <NavBar />
      </div>

      <Outlet />
    </div>
  );
};

export default Body;
