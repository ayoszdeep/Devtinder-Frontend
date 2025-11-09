import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Users, UserX } from 'lucide-react';

function Connection() {
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connection);

  const getConnections = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/connections", {
        withCredentials: true
      });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const defaultPhotoUrl = "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-indigo-600" />
            My Connections
          </h1>
          <p className="text-gray-600">People you're connected with</p>
        </div>

        {(!connection || connection.length === 0) ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <UserX className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Connections Found
            </h2>
            <p className="text-gray-500">
              Start connecting with people to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connection.map((conn, index) => {
              const { firstName, lastName, photoUrl, about, age, gender } = conn;
              
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
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
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {about}
                      </p>
                    )}
                    
                    <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      View Profile
                    </button>
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

export default Connection;