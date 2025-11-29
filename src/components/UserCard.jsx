import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeFeed } from '../utils/feedSLice';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (status, userId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `http://localhost:7777/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { _id, firstName, lastName, profilePic, about, age } = user;
  const defaultPhotoUrl = 'https://via.placeholder.com/300';

  return (
    <div className="card bg-base-100 w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative overflow-hidden bg-gray-200 h-64">
        <img 
          src={profilePic || defaultPhotoUrl} 
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body bg-white">
        <h2 className="card-title text-2xl text-gray-900">
          {firstName} {lastName}
          {age && <span className="text-lg font-normal ml-2 text-gray-700">({age})</span>}
        </h2>
        {about && <p className="text-gray-800 line-clamp-2 font-medium">{about}</p>}
        
        {error && <div className="alert alert-error text-sm py-2 text-red-800"><span className="font-semibold">{error}</span></div>}
        
        <div className="card-actions justify-between mt-4">
          <button 
            onClick={() => handleSubmit('ignored', _id)}
            disabled={loading}
            className="btn btn-outline btn-error flex-1 gap-2"
          >
            <ThumbsDown className="w-4 h-4" />
            Ignore
          </button>
          <button 
            onClick={() => handleSubmit('interested', _id)}
            disabled={loading}
            className="btn btn-success btn-outline flex-1 gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
