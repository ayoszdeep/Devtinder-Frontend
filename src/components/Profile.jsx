import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';

const Profile = () => {
  const data = useSelector((state) => state.user);

  return data ? (
    <div><EditProfile data={data} /></div>
  ) : (
    <div>No User Logged In</div>
  );
};

export default Profile;
