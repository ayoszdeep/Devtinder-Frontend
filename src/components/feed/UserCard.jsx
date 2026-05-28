import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import apiClient from '../../api/client'
import { removeFeed } from '../../store/slices/feedSlice'
import { Heart, X } from 'lucide-react'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (status, userId) => {
    setLoading(true)
    setError(null)
    try {
      await apiClient.post(`/request/send/${status}/${userId}`, {})
      dispatch(removeFeed(userId))
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send request")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const { _id, firstName, lastName, profilePic, about, age, skills } = user
  const defaultPhotoUrl = 'https://via.placeholder.com/400x500'

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden card-3d">
      <figure className="relative bg-base-200 h-80 sm:h-96">
        <img
          src={profilePic || defaultPhotoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-bold text-white">
            {firstName} {lastName}
            {age && <span className="text-xl font-normal ml-2 text-white/80">{age}</span>}
          </h2>
        </div>
      </figure>
      <div className="card-body bg-base-100 px-6 py-5">
        <div className="min-h-[4rem]">
          {about && <p className="text-base-content/80 leading-relaxed font-medium">{about}</p>}
          {!about && <p className="text-base-content/40 italic font-medium">No bio</p>}
        </div>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skills.slice(0, 4).map((s, i) => (
              <span key={i} className="badge badge-primary badge-outline badge-sm">{s}</span>
            ))}
            {skills.length > 4 && <span className="badge badge-ghost badge-sm">+{skills.length - 4}</span>}
          </div>
        )}

        {error && (
          <div className="alert alert-error text-sm py-2 mt-2">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={() => handleSubmit('ignored', _id)}
            disabled={loading}
            className="btn btn-circle btn-outline btn-error btn-lg"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={() => handleSubmit('interested', _id)}
            disabled={loading}
            className="btn btn-circle btn-outline btn-success btn-lg"
          >
            <Heart className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
