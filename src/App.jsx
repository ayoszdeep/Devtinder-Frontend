import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './store/index'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import ProfilePage from './pages/ProfilePage'
import ConnectionsPage from './pages/ConnectionsPage'
import RequestsPage from './pages/RequestsPage'
import AboutPage from './pages/AboutPage'
import MouseGlow from './components/ui/MouseGlow'
import ClickSparkle from './components/ui/ClickSparkle'
import { applyTheme } from './config/theme'

function App() {
  useEffect(() => { applyTheme() }, [])

  return (
    <Provider store={appStore}>
      <MouseGlow />
      <ClickSparkle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<ProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="connection" element={<ConnectionsPage />} />
            <Route path="request" element={<RequestsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
