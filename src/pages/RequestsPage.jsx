import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../store/slices/requestSlice'
import apiClient from '../api/client'
import { UserPlus, Inbox, Check, X, AlertCircle } from 'lucide-react'

function RequestsPage() {
  const dispatch = useDispatch()
  const requests = useSelector((state) => state.request)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const reviewRequests = async (status, _id) => {
    try {
      await apiClient.post(`/request/review/${status}/${_id}`, {})
      dispatch(removeRequest(_id))
      getRequests()
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update request")
      console.log(error)
    }
  }

  const getRequests = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.get('/user/request/received')
      dispatch(addRequest(res.data.data || []))
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load requests")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  const defaultPhotoUrl = "https://via.placeholder.com/150"

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-3">
            <UserPlus className="w-10 h-10 text-secondary" />
            Connection Requests
          </h1>
          <p className="text-base-content/70 font-medium">People who want to connect with you</p>
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
              <p className="text-base-content/70 font-medium">Loading requests...</p>
            </div>
          </div>
        ) : (!requests || requests.length === 0) ? (
          <div className="bg-base-100 rounded-box shadow-lg p-12 text-center">
            <Inbox className="w-20 h-20 text-base-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-base-content mb-2">No Pending Requests</h2>
            <p className="text-base-content/70 font-medium">You're all caught up! No new connection requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => {
              const sender = req.SenderConnection || req.Sender || req.fromUserId || {}
              const { firstName, lastName, profilePic, about, age, gender } = sender
              return (
                <div key={req._id} className="bg-base-100 rounded-box shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-3d">
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-secondary to-accent"></div>
                    <img src={profilePic || defaultPhotoUrl} alt={`${firstName || 'User'} ${lastName || ''}`} className="w-24 h-24 rounded-full border-4 border-base-100 absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover" />
                  </div>
                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold text-base-content mb-1">{firstName || 'Unknown'} {lastName || ''}</h3>
                    {(age || gender) && <p className="text-sm text-base-content/70 font-medium mb-3">{age && `${age} years`}{age && gender && " • "}{gender}</p>}
                    {about && <p className="text-base-content/80 text-sm line-clamp-3 mb-4 font-medium">{about}</p>}
                    <div className="flex gap-3">
                      <button onClick={() => reviewRequests("accepted", req._id)} className="flex-1 bg-success hover:bg-success/90 text-success-content font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Accept
                      </button>
                      <button onClick={() => reviewRequests("rejected", req._id)} className="flex-1 bg-error hover:bg-error/90 text-error-content font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
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

export default RequestsPage
