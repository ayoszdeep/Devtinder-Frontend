import React, { useEffect } from 'react'
import apiClient from '../api/client'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../components/feed/UserCard'
import { addFeed } from '../store/slices/feedSlice'

const FeedPage = () => {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)

  const getFeed = async () => {
    try {
      if (Array.isArray(feed) && feed.length > 0) return
      const response = await apiClient.get('/user/feed')
      const data = response.data?.data ?? response.data
      dispatch(addFeed(Array.isArray(data) ? data : []))
    } catch (err) {
      console.error('Failed to fetch feed:', err)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (!Array.isArray(feed) || feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="text-center p-8 bg-base-100/60 backdrop-blur-3xl rounded-[2rem] border border-primary/20 shadow-lg">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-base-300 flex items-center justify-center">
            <span className="text-3xl">👀</span>
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No More Profiles</h1>
          <p className="text-base-content/60 font-medium">Check back later for new people to connect with</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <div className="w-full max-w-md">
        <UserCard key={feed[0]._id} user={feed[0]} />
        <div className="flex justify-center gap-1.5 mt-6">
          {feed.map((u, i) => (
            <div
              key={u._id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-primary w-6' : 'bg-base-300'}`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-base-content/40 font-medium mt-2">
          {feed.length} profile{feed.length > 1 ? 's' : ''} remaining
        </p>
      </div>
    </div>
  )
}

export default FeedPage
