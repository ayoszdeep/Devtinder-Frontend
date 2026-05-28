import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditProfilePage from './EditProfilePage'
import { Calendar, Mail, Cake, UserRound, BookOpen, Wrench, Clock } from 'lucide-react'

const ProfilePage = () => {
  const data = useSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-base-content">Loading...</h1>
      </div>
    )
  }

  const joinedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  const lastUpdated = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 rounded-box shadow-lg overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-primary via-primary/80 to-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-24 h-24 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex items-end gap-6 -mt-16 relative mb-8">
              {data.profilePic || data.photoUrl ? (
                <img
                  src={data.profilePic || data.photoUrl}
                  alt={data.firstName}
                  className="w-32 h-32 rounded-full border-4 border-base-100 shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-base-100 shadow-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary-content">{data.firstName?.[0]}</span>
                </div>
              )}
              <div className="flex-1 pt-4 flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-base-content">
                    {data.firstName} {data.lastName}
                  </h1>
                  <div className="flex items-center gap-3 mt-1 text-base-content/60 text-sm">
                    {data.emailId && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> {data.emailId}
                      </span>
                    )}
                    {joinedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Joined {joinedDate}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-primary btn-sm"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {isEditing ? (
              <EditProfilePage data={data} onCancel={() => setIsEditing(false)} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-base-200/50 rounded-box p-4">
                    <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3">Personal Info</h2>
                    <div className="space-y-3">
                      {data.age && (
                        <div className="flex items-center gap-3 text-base-content/80">
                          <Cake className="w-4 h-4 text-primary" />
                          <span className="font-medium">{data.age} years old</span>
                        </div>
                      )}
                      {data.gender && (
                        <div className="flex items-center gap-3 text-base-content/80">
                          <UserRound className="w-4 h-4 text-primary" />
                          <span className="font-medium capitalize">{data.gender}</span>
                        </div>
                      )}
                      {lastUpdated && (
                        <div className="flex items-center gap-3 text-base-content/80">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium">Last updated {lastUpdated}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {data.skills && data.skills.length > 0 && (
                    <div className="bg-base-200/50 rounded-box p-4">
                      <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-secondary" /> Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                          <span key={idx} className="badge badge-secondary badge-outline">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-base-200/50 rounded-box p-4 h-full">
                    <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-secondary" /> About
                    </h2>
                    <p className="text-base-content/80 leading-relaxed font-medium">
                      {data.about || "No bio added yet"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
