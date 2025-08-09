import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { userAtom } from '../atom/store';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('UserB@gmail.com');
  const [password, setPassword] = useState('UserB@123');

  const [errorMessage, setErrorMessage] = useState();

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
        navigate('/');
      } else {
        setUser(undefined);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex justify-center items-center my-10'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title'>Login</h2>

          <div className='my-2'>
            <label className='input validator'>
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
            <label className='input '>
              <input
                type='password'
                required
                placeholder='Password'
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <p className='text-red-600'>{errorMessage}</p>

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
