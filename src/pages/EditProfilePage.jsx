import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/slices/userSlice'
import apiClient from '../api/client'

const EDITABLE_FIELDS = ["gender", "age", "skills", "about", "emailId", "profilePic"]

const EditProfilePage = ({ data, onCancel }) => {
  const [profilePic, setProfilePic] = useState(data?.profilePic || data?.photoUrl || '')
  const [age, setAge] = useState(data?.age || '')
  const [gender, setGender] = useState(data?.gender || '')
  const [about, setAbout] = useState(data?.about || '')
  const [emailId, setEmailId] = useState(data?.emailId || '')
  const [skills, setSkills] = useState(data?.skills?.join(', ') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const saveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const body = {
        profilePic,
        age: age || undefined,
        gender: gender || undefined,
        about: about || undefined,
        emailId: emailId || undefined,
        skills: skills ? skills.split(',').map(s => s.trim()) : undefined,
      }
      const res = await apiClient.patch('/profile/edit', body)
      const payload = res.data?.data ?? res.data
      dispatch(addUser(payload.user ?? payload))
      setSuccess(true)
      setTimeout(() => {
        if (onCancel) onCancel()
      }, 1500)
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed")
      console.log("Profile update failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-base-100 rounded-lg p-6 border border-base-300">
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">Profile updated successfully!</div>}

      <form onSubmit={saveProfile} className="space-y-4">
        <h2 className="text-lg font-bold mb-6 text-base-content">Edit Your Profile</h2>

        <div>
          <label className="block font-semibold text-base-content mb-2">Profile Picture URL</label>
          <input type="url" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content" placeholder="https://example.com/photo.jpg" />
        </div>

        <div>
          <label className="block font-semibold text-base-content mb-2">Email</label>
          <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-base-content mb-2">Age</label>
            <input type="number" min="18" max="120" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content" />
          </div>
          <div>
            <label className="block font-semibold text-base-content mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-base-content mb-2">Skills (comma-separated)</label>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content" placeholder="React, Node.js, Python" />
        </div>

        <div>
          <label className="block font-semibold text-base-content mb-2">About</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="w-full px-3 py-2 border border-base-300 rounded-field bg-base-100 text-base-content" rows="4" placeholder="Tell us about yourself..."></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="flex-1 py-2 px-4 text-primary-content bg-primary rounded-field hover:bg-primary/90 disabled:bg-base-300 transition">
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="flex-1 py-2 px-4 text-base-content bg-base-300 rounded-field hover:bg-base-300/80 transition">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditProfilePage
