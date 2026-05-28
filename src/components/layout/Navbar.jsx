import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../../store/slices/userSlice'
import apiClient from '../../api/client'
import { APP_NAME } from '../../config/constants'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout')
      dispatch(removeUser())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">{APP_NAME}</Link>
      </div>

      {!user && (
        <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
      )}

      {user && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user.profilePic || user.photoUrl ? (
                <img alt="avatar" src={user.profilePic || user.photoUrl} />
              ) : (
                <div className="w-full h-full bg-base-100 flex items-center justify-center text-primary font-bold text-lg">
                  {user.firstName?.[0] || '?'}
                </div>
              )}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow text-base-content mt-3">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connection">Connections</Link></li>
            <li><Link to="/request">Requests</Link></li>
            <li><div className="divider my-1"></div></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar