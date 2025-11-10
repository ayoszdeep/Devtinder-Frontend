import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin,setUseLogin]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup=async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7777/signup', {
        firstName,
        lastName,
        emailId,
        password
      }, { withCredentials: true });
        dispatch(addUser(res.data.data));
      navigate('/');

    
    
    }
      catch (error) {
        console.error(error);
      }
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7777/login', {
        emailId,
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
        <h1>{isLogin?"Login":"Signup"}</h1>
            {!isLogin&&<> <div className="mb-5">
          <label className="block mb-1 text-white">FirstName</label>
          <input 
            type="text" 
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
            required 
          />
        </div>      
               <div className="mb-5">
          <label className="block mb-1 text-white">LastName</label>
          <input 
            type="text" 
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
            required 
          />
        </div>  </>}
        <div className="mb-5">
          <label className="block mb-1 text-white">Email Id:</label>
          <input 
            type="email" 
            value={emailId}
            onChange={e => setEmailId(e.target.value)}
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
        <button onClick={()=>{isLogin?handleSubmit:signup}} type="submit" className="py-2 px-4 text-white bg-blue-900 w-full rounded hover:bg-blue-400 transition">
          {isLogin?"Login":"Signup"}
        </button>
      </form>
      <h5 onClick={()=>setUseLogin(value=>!value)}>{isLogin?"U want to do signup":"u want to login"}</h5>
    </div>
  );
};

export default Login;
