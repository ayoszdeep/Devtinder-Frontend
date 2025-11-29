import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const EditProfile = ({ data, onCancel }) => {

  const [firstName, setFirstName] = useState(data?.firstName || '');
  const [lastName, setLastName] = useState(data?.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(data?.photoUrl || '');
  const [age, setAge] = useState(data?.age || '');
  const [gender, setGender] = useState(data?.gender || '');
  const [about, setAbout] = useState(data?.about || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await axios.patch(
        'http://localhost:7777/profile/edit',
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setSuccess(true);
      setTimeout(() => {
        if (onCancel) onCancel();
      }, 1500);

    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed");
      console.log("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">Profile updated successfully!</div>}
      
      <form onSubmit={saveProfile} className="space-y-4">
        <h2 className="text-lg font-bold mb-6">Edit Your Profile</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Photo URL</label>
          <input 
            type="url" 
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Age</label>
            <input 
              type="number" 
              min="18"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
