import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import apiClient from '../../api/client'
import { removeFeed } from '../../store/slices/feedSlice'
import { Heart, X } from 'lucide-react'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [swipeDir, setSwipeDir] = useState(null)

  const handleSubmit = async (status, userId) => {
    setLoading(true)
    setError(null)
    
    // Trigger swipe animation immediately
    setSwipeDir(status === 'ignored' ? 'left' : 'right')
    
    try {
      await apiClient.post(`/request/send/${status}/${userId}`, {})
      // Wait for animation to finish before removing from Redux
      setTimeout(() => {
        dispatch(removeFeed(userId))
      }, 350)
    } catch (err) {
      setSwipeDir(null) // Revert animation if error
      setError(err.response?.data?.message || "Failed to send request")
      console.error(err)
      setLoading(false)
    }
  }

  const { _id, firstName, lastName, profilePic, about, age, skills } = user
  const defaultPhotoUrl = 'https://via.placeholder.com/400x600'

  return (
    <div className={`relative w-full max-w-[380px] h-[600px] rounded-[2.5rem] bg-base-300 shadow-2xl overflow-hidden card-3d transition-all duration-350 ease-in-out transform ${swipeDir === 'left' ? '-translate-x-[150%] -rotate-[15deg] opacity-0' : swipeDir === 'right' ? 'translate-x-[150%] rotate-[15deg] opacity-0' : 'scale-100 opacity-100'}`}>
      
      {/* Full Background Image */}
      <img
        src={profilePic || defaultPhotoUrl}
        alt={`${firstName} ${lastName}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

      {/* Card Content (Bottom Aligned) */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full pointer-events-none">
        
        {/* Profile Info */}
        <div className="pointer-events-auto">
          <h2 className="text-4xl font-black text-white drop-shadow-lg tracking-tight mb-2 leading-none">
            {firstName} <span className="font-medium text-3xl opacity-90">{lastName}</span>
            {age && <span className="text-2xl font-normal ml-3 text-white/80">{age}</span>}
          </h2>
          
          <div className="min-h-[3rem] mb-4">
            {about ? (
              <p className="text-white/80 leading-snug font-medium text-sm line-clamp-2">{about}</p>
            ) : (
              <p className="text-white/40 italic font-medium text-sm">No bio available</p>
            )}
          </div>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.slice(0, 3).map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide border border-white/10 shadow-sm">
                  {s}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/70 text-xs font-bold tracking-wide border border-white/5">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          )}

          {error && (
            <div className="bg-error/80 backdrop-blur-md text-white text-xs py-2 px-3 rounded-xl mb-4 font-bold text-center">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-2">
            <button
              onClick={() => handleSubmit('ignored', _id)}
              disabled={loading}
              className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 hover:bg-black/60 hover:border-error/50 hover:text-error hover:scale-[1.1] hover:shadow-[0_0_25px_rgba(248,114,114,0.3)] transition-all duration-300 flex items-center justify-center group pointer-events-auto"
            >
              <X className="w-8 h-8 group-hover:scale-[1.2] transition-transform duration-300" strokeWidth={3} />
            </button>
            <button
              onClick={() => handleSubmit('interested', _id)}
              disabled={loading}
              className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/80 hover:bg-black/60 hover:border-success/50 hover:text-success hover:scale-[1.1] hover:shadow-[0_0_25px_rgba(54,211,153,0.3)] transition-all duration-300 flex items-center justify-center group pointer-events-auto"
            >
              <Heart className="w-7 h-7 group-hover:scale-[1.2] fill-transparent group-hover:fill-success transition-all duration-300" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
