import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile';

const Profile = () => {
  const data = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!data) {
    return <div className="flex justify-center items-center min-h-screen"><h1>Loading...</h1></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          {/* Profile Content */}
          <div className="px-8 py-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6 mb-8 -mt-20 relative">
              <img
                src={data.photoUrl || "https://via.placeholder.com/150"}
                alt={data.firstName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="flex-1 pt-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {data.firstName} {data.lastName}
                </h1>
                {data.age && <p className="text-gray-600 text-lg">Age: {data.age}</p>}
                {data.gender && <p className="text-gray-600">Gender: {data.gender}</p>}
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-primary"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <EditProfile data={data} onCancel={() => setIsEditing(false)} />
            ) : (
              <div className="space-y-6">
                {/* About Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-800 text-base font-medium">
                    {data.about || "No bio added yet"}
                  </p>
                </div>

                {/* Contact Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
                  <p className="text-gray-800 font-medium">Email: {data.emailId || "N/A"}</p>
                </div>

                {/* Skills Section */}
                {data.skills && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
