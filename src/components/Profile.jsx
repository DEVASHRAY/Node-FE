import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../atom/store';
import FeedCard from './UserCard';
import UserCard from './UserCard';

const Profile = () => {
  const [user] = useAtom(userAtom);
  return (
    user && (
      <div className='flex items-center justify-center h-full'>
        <UserCard user={user} />
      </div>
    )
  );
};

export default Profile;
