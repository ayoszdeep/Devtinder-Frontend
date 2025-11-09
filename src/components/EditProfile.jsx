import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserCard from './userCard';

const EditProfile = ({ data }) => {

  const [firstName, setFirstName] = useState(data?.firstName || '');
  const [lastName, setLastName] = useState(data?.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(data?.photoUrl || '');
  const [age, setAge] = useState(data?.age || '');
  const [gender, setGender] = useState(data?.gender || '');
  const [about, setAbout] = useState(data?.about || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        'http://localhost:7777/profile/edit',
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));// store updated user in redux
     

    } catch (error) {
      console.log("Profile update failed:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={saveProfile} className="w-full max-w-sm bg-orange-600 p-8 rounded shadow-md">
          <h2 className="text-white text-lg font-bold mb-5 text-center">Edit Profile</h2>

          <label className="block mb-1 text-white">First Name</label>
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full px-3 py-2 mb-4 border rounded"
            required
          />

          <label className="block mb-1 text-white">Last Name</label>
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full px-3 py-2 mb-4 border rounded"
            required
          />

          <label className="block mb-1 text-white">Photo URL</label>
          <input 
            type="text" 
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="block w-full px-3 py-2 mb-4 border rounded"
          />

          <label className="block mb-1 text-white">Age</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="block w-full px-3 py-2 mb-4 border rounded"
            required
          />

          <label className="block mb-1 text-white">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full px-3 py-2 mb-4 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="block mb-1 text-white">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="block w-full px-3 py-2 mb-6 border rounded"
            rows="3"
          ></textarea>

          <button 
            type="submit"
            className="py-2 px-4 text-white bg-blue-900 w-full rounded hover:bg-blue-400 transition"
          >
            Save Changes
          </button>

        </form>
      </div>

      <div className="flex justify-center py-10">
        <UserCard user={{ firstName, lastName, photoUrl, about, age }} />
      </div>
    </>
  );
};

export default EditProfile;
