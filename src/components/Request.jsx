import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import axios from 'axios';
import { UserPlus, Inbox, Check, X, AlertCircle } from 'lucide-react';

function Request() {
  const dispatch = useDispatch();
  // NOTE: expecting `state.request` to be an array of connection request objects
  const requests = useSelector((state) => state.request);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewRequests = async (status, _id) => {
    try {
      // call backend to update the request status
      await axios.post(
        "http://localhost:7777/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      // remove locally and refresh list
      dispatch(removeRequest(_id)); // 🔧 CHANGED: keep local state consistent
      getRequests(); // 🔧 CHANGED: re-fetch to get latest server state
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update request");
      console.log(error);
    }
  };

  const getRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "http://localhost:7777/user/request/received",
        { withCredentials: true }
      );

      console.log(res.data);
      // 🔧 CHANGED: backend returns { message, data: [...] }
      // make sure we pass the array (or empty array) to the redux action
      dispatch(addRequest(res.data.data || []));
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load requests");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultPhotoUrl = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <UserPlus className="w-10 h-10 text-purple-700" />
            Connection Requests
          </h1>
          <p className="text-gray-800 font-medium">People who want to connect with you</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-800 font-medium">Loading requests...</p>
            </div>
          </div>
        ) : (!requests || requests.length === 0) ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Inbox className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Pending Requests
            </h2>
            <p className="text-gray-700 font-medium">
              You're all caught up! No new connection requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => {
              // 🔧 CHANGED: backend returns user info inside `SenderConnection` (based on your Postman output)
              const sender = req.SenderConnection || req.Sender || req.fromUserId || {};

              const {
                firstName,
                lastName,
                profilePic,
                about,
                age,
                gender
              } = sender; // 🔧 CHANGED: destructure from the correct object

              return (
                <div
                  key={req._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                    <img
                      // 🔧 CHANGED: use `profilePic` from SenderConnection and fallback to default
                      src={profilePic || defaultPhotoUrl}
                      alt={`${firstName || 'User'} ${lastName || ''}`}
                      className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                    />
                  </div>

                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {firstName || 'Unknown'} {lastName || ''}
                    </h3>

                    {(age || gender) && (
                      <p className="text-sm text-gray-700 font-medium mb-3">
                        {age && `${age} years`}
                        {age && gender && " • "}
                        {gender}
                      </p>
                    )}

                    {about && (
                      <p className="text-gray-800 text-sm line-clamp-3 mb-4 font-medium">
                        {about}
                      </p>
                    )}

                    <div className="flex gap-3 bg-black">
                      <button
                        onClick={() => reviewRequests("accepted", req._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => reviewRequests("rejected", req._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Request;
