import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../atom/store';

const NavBar = () => {
  const [user] = useAtom(userAtom);
  return (
    <div className='navbar bg-base-300 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Dev Tinder</a>
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
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
