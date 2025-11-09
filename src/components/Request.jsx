import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import axios from 'axios';
import { UserPlus, Inbox, Check, X } from 'lucide-react';

function Request() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);
  
  const reviewRequests = async (status, _id) => {
    try {
      const response = await axios.post(
        "http://localhost:7777/user/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest());
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/request/received", {
        withCredentials: true
      });
      console.log(res.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const defaultPhotoUrl = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <UserPlus className="w-10 h-10 text-purple-600" />
            Connection Requests
          </h1>
          <p className="text-gray-600">People who want to connect with you</p>
        </div>

        {(!requests || requests.length === 0) ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Inbox className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Pending Requests
            </h2>
            <p className="text-gray-500">
              You're all caught up! No new connection requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => {
              const { firstName, lastName, photoUrl, about, age, gender } = req.fromUserId;
              
              return (
                <div 
                  key={req._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                    <img 
                      src={photoUrl || defaultPhotoUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                    />
                  </div>
                  
                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {firstName} {lastName}
                    </h3>
                    
                    {(age || gender) && (
                      <p className="text-sm text-gray-500 mb-3">
                        {age && `${age} years`}
                        {age && gender && ' • '}
                        {gender}
                      </p>
                    )}
                    
                    {about && (
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {about}
                      </p>
                    )}
                    
                    <div className="flex gap-3">
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