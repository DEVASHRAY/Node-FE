import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import UserCard from './UserCard';

const Connection = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      setConnections(response.data.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log(connections);

  if (connections.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>No connections found</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-[100%] overflow-auto'>
      <h1 className='text-2xl font-bold'>Connections</h1>
      <div className='flex flex-row gap-4 mt-8 max-w-[90%] overflow-x-auto px-4 snap-x snap-mandatory justify-start'>
        {connections.map((connection) => (
          <UserCard
            key={connection._id}
            user={connection.connectedUserDetails}
            info={
              connection.connectedAt &&
              new Date(connection.connectedAt).toLocaleString(undefined, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }
            className='snap-start'
          />
        ))}
      </div>
    </div>
  );
};

export default Connection;
