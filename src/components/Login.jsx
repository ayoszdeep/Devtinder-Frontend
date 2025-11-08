import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7777/login', {
        email,
        password
      }, { withCredentials: true });

      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-sm bg-orange-600 p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-1 text-white">Email Id:</label>
          <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-white">Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
            required 
          />
        </div>
        <button type="submit" className="py-2 px-4 text-white bg-blue-900 w-full rounded hover:bg-blue-400 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
