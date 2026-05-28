import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../../store/slices/userSlice'
import apiClient from '../../api/client'
import { APP_NAME } from '../../config/constants'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [theme, setTheme] = React.useState(() => localStorage.getItem('devtinder-theme') || 'darkpink')

  const toggleTheme = () => {
    const newTheme = theme === 'darkpink' ? 'lightorange' : 'darkpink'
    setTheme(newTheme)
    localStorage.setItem('devtinder-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

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
    <div className="sticky top-4 z-50 px-4 sm:px-8 w-full max-w-7xl mx-auto mb-4">
      <div className="navbar bg-neutral/80 backdrop-blur-xl text-neutral-content shadow-2xl rounded-2xl border border-white/5 py-2 px-4 sm:px-6">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
            {APP_NAME}
          </Link>
        </div>

        {!user && (
          <div className="flex gap-3 items-center">
            <Link to="/login" className="btn btn-sm rounded-full px-6 font-bold shadow-lg hover:scale-105 transition-transform text-black border-none hover:brightness-90" style={{ backgroundColor: 'var(--color-login-btn)' }}>
              Login
            </Link>
            <Link to="/login" className="btn btn-sm rounded-full px-6 font-bold shadow-lg hover:scale-105 transition-transform text-black border-none hover:brightness-90" style={{ backgroundColor: 'var(--color-login-btn)' }}>
              Sign up
            </Link>
          </div>
        )}

        {user && (
          <div className="flex-none flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex gap-2 font-semibold text-sm mr-2">
              <Link to="/profile" className="px-4 py-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95]">Profile</Link>
              <Link to="/connection" className="px-4 py-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95]">Connections</Link>
              <Link to="/request" className="px-4 py-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95]">Requests</Link>
            </div>
            
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost btn-circle shadow-sm bg-base-100/10 hover:bg-base-100/20 text-neutral-content transition-all hover:scale-105 mr-1"
              aria-label="Toggle Theme"
            >
              {theme === 'darkpink' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-neutral ring-offset-2 transition-transform hover:scale-105 shadow-lg">
                <div className="w-10 rounded-full bg-base-100">
                  {user.profilePic || user.photoUrl ? (
                    <img alt="avatar" src={user.profilePic || user.photoUrl} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-base-100 flex items-center justify-center text-primary font-bold text-lg">
                      {user.firstName?.[0] || '?'}
                    </div>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-base-content mt-4 font-bold border border-base-200/50 backdrop-blur-md">
                <li className="sm:hidden"><Link to="/profile" className="py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200">Profile</Link></li>
                <li className="sm:hidden"><Link to="/connection" className="py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200">Connections</Link></li>
                <li className="sm:hidden"><Link to="/request" className="py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200">Requests</Link></li>
                <li className="sm:hidden"><div className="divider my-0 opacity-50"></div></li>
                <li><a onClick={handleLogout} className="text-error bg-error/5 hover:bg-error hover:text-error-content transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] py-3 px-4 rounded-xl mt-1 shadow-sm font-black tracking-wide">Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar