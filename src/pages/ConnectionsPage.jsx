import apiClient from '../api/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../store/slices/connectionSlice'
import { Users, UserX, AlertCircle } from 'lucide-react'

function ConnectionsPage() {
  const dispatch = useDispatch()
  const connection = useSelector((state) => state.connection)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getConnections = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.get('/user/connections')
      dispatch(addConnection(res.data.data || []))
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load connections")
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  const defaultPhotoUrl = "https://via.placeholder.com/150"

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-primary" />
            My Connections
          </h1>
          <p className="text-base-content/70 font-medium">People you're connected with</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-box mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-base-content/70 font-medium">Loading connections...</p>
            </div>
          </div>
        ) : (!connection || connection.length === 0) ? (
          <div className="bg-base-100 rounded-box shadow-lg p-12 text-center">
            <UserX className="w-20 h-20 text-base-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-base-content mb-2">No Connections Found</h2>
            <p className="text-base-content/70 font-medium">Start connecting with people to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connection.map((conn, index) => {
              const { firstName, lastName, photoUrl, about, age, gender } = conn
              return (
                <div key={index} className="bg-base-100 rounded-box shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group card-3d">
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                    <img
                      src={photoUrl || defaultPhotoUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-24 h-24 rounded-full border-4 border-base-100 absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                    />
                  </div>
                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold text-base-content mb-1">{firstName} {lastName}</h3>
                    {(age || gender) && (
                      <p className="text-sm text-base-content/70 font-medium mb-3">
                        {age && `${age} years`}{age && gender && ' • '}{gender}
                      </p>
                    )}
                    {about && <p className="text-base-content/80 text-sm line-clamp-3 font-medium">{about}</p>}
                    <button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-content font-medium py-2 px-4 rounded-lg transition-colors duration-200">View Profile</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConnectionsPage
