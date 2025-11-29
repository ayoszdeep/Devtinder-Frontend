import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { addFeed } from '../utils/feedSLice';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      // if feed already loaded and is an array, skip fetching
      if (Array.isArray(feed) && feed.length > 0) return;

      const response = await axios.get('http://localhost:7777/user/feed', { withCredentials: true });
      // server returns { message, data: [...] } — we need the data array
      const data = response.data?.data ?? response.data;
      console.log('feed response', data);
      dispatch(addFeed(data));
    } catch (err) {
      console.error('Failed to fetch feed:', err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // minimal change: empty deps is fine here

  if (!Array.isArray(feed) || feed.length === 0) return <div className="flex justify-center items-center min-h-screen"><h1 className="text-2xl font-bold text-gray-800">No Feed Available</h1></div>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 min-h-screen p-4">
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
