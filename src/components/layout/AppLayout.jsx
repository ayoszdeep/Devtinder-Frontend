import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import apiClient from '../../api/client'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/slices/userSlice'

const AppLayout = () => {
  const [authLoading, setAuthLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const res = await apiClient.get('/profile/view')
      const payload = res.data?.data ?? res.data
      dispatch(addUser(payload.user ?? payload))
      setAuthLoading(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
