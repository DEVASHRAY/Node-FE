import React from 'react';

const UserCard = ({ user, info, cta1, cta2 }) => {
  console.log('UserCard', user);
  return (
    <div className='card bg-base-300 w-96 min-w-[384px] shadow-sm pt-4 snap-start'>
      <figure>
        <img
          src={user.photoUrl}
          alt='Shoes'
          className='rounded-lg w-[360px] h-[360px]'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{user.firstName}</h2>
        <p>{user.gender}</p>
        <p>{user.age}</p>

        {info && (
          <div className='card-actions justify-center'>
            <p>{info}</p>
          </div>
        )}

        <div className='flex flex-row gap-2 justify-center '>
          {cta2 && (
            <button className='btn btn-primary flex-1' onClick={cta2.onClick}>
              {cta2.label}
            </button>
          )}

          {cta1 && (
            <button className='btn btn-secondary flex-1' onClick={cta1.onClick}>
              {cta1.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
