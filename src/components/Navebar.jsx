import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar bg-error shadow-lg text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>

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
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
