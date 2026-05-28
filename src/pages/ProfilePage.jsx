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
    <div className="min-h-[calc(100vh-8rem)] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-content/5">
          <div className="h-48 bg-gradient-to-r from-primary via-primary/80 to-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="px-10 pb-10">
            <div className="flex items-end gap-8 -mt-20 relative mb-10">
              {data.profilePic || data.photoUrl ? (
                <img
                  src={data.profilePic || data.photoUrl}
                  alt={data.firstName}
                  className="w-40 h-40 rounded-[2rem] border-[6px] border-base-100 shadow-2xl object-cover bg-base-100"
                />
              ) : (
                <div className="w-40 h-40 rounded-[2rem] border-[6px] border-base-100 shadow-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-6xl font-black text-primary-content">{data.firstName?.[0]}</span>
                </div>
              )}
              <div className="flex-1 pt-4 flex items-end justify-between pb-2">
                <div>
                  <h1 className="text-4xl font-black text-base-content tracking-tight">
                    {data.firstName} {data.lastName}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-base-content/60 text-sm font-medium">
                    {data.emailId && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" /> {data.emailId}
                      </span>
                    )}
                    {joinedDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Joined {joinedDate}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-primary rounded-xl px-8 font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {isEditing ? (
              <EditProfilePage data={data} onCancel={() => setIsEditing(false)} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-base-200/50 rounded-[2rem] p-6 border border-base-content/5 shadow-sm">
                    <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <UserRound className="w-4 h-4" /> Personal Info
                    </h2>
                    <div className="space-y-4">
                      {data.age && (
                        <div className="flex items-center gap-4 text-base-content/80">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Cake className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-semibold text-lg">{data.age} years old</span>
                        </div>
                      )}
                      {data.gender && (
                        <div className="flex items-center gap-4 text-base-content/80">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <UserRound className="w-5 h-5 text-secondary" />
                          </div>
                          <span className="font-semibold text-lg capitalize">{data.gender}</span>
                        </div>
                      )}
                      {lastUpdated && (
                        <div className="flex items-center gap-4 text-base-content/60">
                          <div className="w-10 h-10 rounded-full bg-base-content/5 flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-sm">Last updated {lastUpdated}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {data.skills && data.skills.length > 0 && (
                    <div className="bg-base-200/50 rounded-[2rem] p-6 border border-base-content/5 shadow-sm">
                      <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                          <span key={idx} className="px-4 py-2 rounded-xl bg-base-100 shadow-sm border border-base-content/10 font-bold text-sm text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-base-200/50 rounded-[2rem] p-6 border border-base-content/5 shadow-sm h-full min-h-[300px]">
                    <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> About Me
                    </h2>
                    <p className="text-base-content/80 leading-relaxed font-medium text-lg">
                      {data.about || "No bio added yet. Click edit profile to tell everyone about yourself!"}
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
