import axios from 'axios';
import { useAtom } from 'jotai';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { userAtom } from '../atom/store';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {
  const [user] = useAtom(userAtom);

  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(undefined);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navbar bg-base-300 shadow-sm'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className='flex gap-2'>
          <div className='dropdown dropdown-end mx-5'>
            <div className='flex items-center gap-2'>
              <p>{`Welcome , ${user.firstName}`}</p>

              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src={user.photoUrl}
                  />
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to={'/profile'} className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <Link to={'/connection'} className='justify-between'>
                  Connections
                </Link>
              </li>
              <li>
                <Link to={'/request'} className='justify-between'>
                  Request
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
