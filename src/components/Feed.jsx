import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { feedAtom } from '../atom/store';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {
  const [feed, setFeed] = useAtom(feedAtom);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/feed?page=1&limit=10`,
        {
          withCredentials: true,
        }
      );

      console.log(response);

      setFeed(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      const newFeed = feed.filter((item) => item.id !== userId);

      setCurrentIndex((prev) => prev + 1);

      setFeed(newFeed);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIgnore = async (userId) => {
    console.log(userId);
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      {feed.length > 0 && currentIndex < feed.length ? (
        <div className='my-4'>
          <UserCard
            user={feed[currentIndex]}
            cta1={{
              label: 'Interested',
              onClick: () => handleRequest(feed[currentIndex]._id),
            }}
            cta2={{
              label: 'Ignore',
              onClick: () => handleIgnore(feed[currentIndex]._id),
            }}
          />
        </div>
      ) : (
        <p>No Items Available in Feed</p>
      )}
    </div>
  );
};

export default Feed;
