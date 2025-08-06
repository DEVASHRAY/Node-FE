import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { userAtom } from '../atom/store';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('UserA@gmail.com');
  const [password, setPassword] = useState('UserA@123');

  const [user, setUser] = useAtom(userAtom);

  console.log('user', user);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.data) {
        setUser(res.data.data);
        navigate('/feed');
      } else {
        setUser(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center items-center my-10'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title'>Login</h2>

          <div className='my-2'>
            <label className='input validator'>
              <svg
                className='h-[1em] opacity-50'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2.5'
                  fill='none'
                  stroke='currentColor'
                >
                  <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                  <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                </g>
              </svg>
              <input
                type='email'
                placeholder='Enter your email'
                required
                defaultValue={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <div className='validator-hint hidden'>
              Enter valid email address
            </div>
          </div>

          <div className='my-2'>
            <label className='input validator'>
              <svg
                className='h-[1em] opacity-50'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2.5'
                  fill='none'
                  stroke='currentColor'
                >
                  <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
                  <circle
                    cx='16.5'
                    cy='7.5'
                    r='.5'
                    fill='currentColor'
                  ></circle>
                </g>
              </svg>
              <input
                type='password'
                required
                placeholder='Password'
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                title='Must include number, lowercase letter, uppercase letter'
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className='validator-hint hidden'>
              Must include
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>

          <div className='card-actions justify-center'>
            <button className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
