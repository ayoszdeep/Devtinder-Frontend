import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';// ✅ add this
import { useNavigate } from 'react-router-dom';
  

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =  async() => {
    
      try {
        await axios.post('http://localhost:7777/logout', { withCredentials: true });
        dispatch(removeUser());
        navigate('/login');

      } catch (error) {
        console.error(error);      
      }
  
    
  }

  return (
    <div className="navbar bg-error shadow-lg text-white">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>  {/* ✅ Home */}
      </div>

      {!user && (
        <Link to="/login" className="btn btn-outline">Login</Link>   
      )}

      {user && (
        <div className="flex gap-2 dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar flex items-center gap-2">
            <p>{user.firstName}</p>
            <div className="w-10 rounded-full">
              <img
                alt="avatar"
                src={user.photoUrl || "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1339.jpg"}
              />
            </div>
          </div>

          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow text-black">
            <li><Link to="/profile">Profile</Link></li>   {/* ✅ Works */}
            <li><Link to="/settings">Settings</Link></li> {/* ✅ Works */}
            <li><a onClick={handleLogout}>Logout</a></li>   {/* logout logic will come later */}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Navbar;
