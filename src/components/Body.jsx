import React, { useEffect } from 'react'
import Navebar from './Navebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch ,useSelector} from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector((state)=>state.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:7777/profile/view', { withCredentials: true });
      dispatch(addUser(res.data.data));
    } catch (error) {
      if(error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if(!user) {
      fetchUser();
    }
  }, [])
  return (
    <div>
        <Navebar/>
        
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body