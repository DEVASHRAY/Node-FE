import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import UserCard from './UserCard';

const Request = () => {
  const [requests, setRequests] = useState([]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      console.log(requestId);
      await axios.post(
        `${BASE_URL}/request/review/accept/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );

      fetchConnections();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      console.log(requestId);
      await axios.post(
        `${BASE_URL}/request/review/reject/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );

      fetchConnections();
    } catch (error) {
      console.error('Error ignoring request:', error);
    }
  };

  if (requests.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>No requests</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Requests</h1>
      <div className='flex flex-row items-center justify-center gap-4 mt-8 max-w-[90%] overflow-auto'>
        {requests.map((request) => (
          <UserCard
            key={request._id}
            user={request.senderId}
            hideButton
            info={
              request.createdAt &&
              new Date(request.createdAt).toLocaleString(undefined, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }
            cta1={{ label: 'Accept', onClick: () => handleAccept(request._id) }}
            cta2={{ label: 'Reject', onClick: () => handleReject(request._id) }}
          />
        ))}
      </div>
    </div>
  );
};

export default Request;
