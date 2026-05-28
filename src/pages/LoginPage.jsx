import React, { useState, useMemo, useEffect } from "react"
import apiClient from "../api/client"
import { useDispatch } from "react-redux"
import { addUser } from "../store/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { LogIn, ArrowRight } from "lucide-react"

const PASSWORD_RULES = [
  { label: "Min 8 characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  { label: "Special character", test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
]

const getStrength = (p) => {
  const passed = PASSWORD_RULES.filter((r) => r.test(p)).length
  if (!p) return { level: 0, label: "", color: "" }
  if (passed <= 1) return { level: 1, label: "Very Weak", color: "bg-red-500" }
  if (passed === 2) return { level: 2, label: "Weak", color: "bg-orange-500" }
  if (passed === 3) return { level: 3, label: "Fair", color: "bg-yellow-500" }
  if (passed === 4) return { level: 4, label: "Good", color: "bg-lime-500" }
  return { level: 5, label: "Strong", color: "bg-green-500" }
}

const LoginPage = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const strength = useMemo(() => getStrength(password), [password])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get('/profile/view')
        navigate('/')
      } catch {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [navigate])

  const signup = async (e) => {
    e.preventDefault()
    if (!isLogin && strength.level < 3) return
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.post("/auth/signup", {
        firstName, lastName, emailId, password, age
      })
      const payload = res.data?.data ?? res.data
      dispatch(addUser(payload.user ?? payload))
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.post("/auth/login", { emailId, password })
      const payload = res.data?.data ?? res.data
      dispatch(addUser(payload.user ?? payload))
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen w-full flex justify-center items-center p-4 relative overflow-hidden"
    >
      <div className="w-full max-w-md relative z-10 bg-base-100/80 backdrop-blur-3xl border border-primary/20 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 sm:p-12">
        
        {/* Subtle radial glow inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_70%)] opacity-[0.08] pointer-events-none rounded-[2rem]"></div>

        <div className="relative z-10">
          {error && (
            <div className="alert alert-error text-xs py-2 mb-6 font-mono rounded-lg shadow-sm border border-error/20 bg-error/10 text-error">
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {isLogin ? (
            /* ================= LOGIN VIEW ================= */
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-full bg-base-100 shadow-sm border border-base-200 flex items-center justify-center mb-6">
                <LogIn className="w-6 h-6 text-base-content/40 ml-1" />
              </div>
              
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-base-content/50 mb-2">
                WELCOME BACK
              </p>
              
              <h1 className="text-5xl font-black tracking-tighter text-base-content mb-3" style={{ fontStretch: 'expanded' }}>
                Login
              </h1>
              
              <p className="font-mono text-xs text-base-content/60 mb-10">
                Pick up where you left off.
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                    EMAIL <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                    placeholder="jane@example.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                    PASSWORD <span className="text-primary">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                    placeholder="Your password"
                    required
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button type="button" className="text-[10px] uppercase tracking-widest font-mono font-bold text-base-content/60 hover:text-primary transition-colors">
                    FORGOT PASSWORD?
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full py-4 text-black rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 border-none hover:brightness-90"
                    style={{ backgroundColor: 'var(--color-login-btn)' }}
                  >
                    {loading ? "Logging in..." : "Login"} 
                    {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>

              <div className="mt-8 font-mono text-xs text-base-content/60">
                No account yet? <button onClick={() => { setIsLogin(false); setError(null); }} className="text-primary hover:brightness-75 font-semibold transition-colors">Register here</button>
              </div>
            </div>
          ) : (
            /* ================= SIGNUP VIEW ================= */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-end mb-6">
                <div className="flex gap-1.5 items-center">
                  <div className="w-4 h-1.5 rounded-full bg-primary"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                </div>
              </div>
              
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-base-content/50 mb-2 text-center">
                STEP 1 OF 2
              </p>
              
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-base-content mb-3 text-center" style={{ fontStretch: 'expanded' }}>
                Start your journey
              </h1>
              
              <p className="font-mono text-xs text-base-content/60 mb-8 text-center leading-relaxed">
                Register for the 45-day sprint and ship code that matters.
              </p>

              <form onSubmit={signup} className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                      FIRST NAME <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                      LAST NAME <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                      EMAIL <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                      AGE <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      min="18"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                      placeholder="18"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/60 font-mono flex gap-1">
                    PASSWORD <span className="text-primary">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base-content font-mono text-sm placeholder:text-base-content/30"
                    placeholder="Min. 8 characters"
                    required
                  />
                  
                  {password.length > 0 && (
                    <div className="pt-2 px-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex-1 h-1 bg-base-300 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${(strength.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-[9px] font-bold font-mono uppercase ${
                          strength.level <= 2 ? 'text-red-500' : strength.level === 3 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {strength.label}
                        </span>
                      </div>
                      
                      {strength.level < 3 && (
                        <p className="text-[9px] text-red-500 font-mono uppercase mt-1">Password too weak</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading || (password.length > 0 && strength.level < 3)}
                    className="group w-full py-4 text-black rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 border-none hover:brightness-90"
                    style={{ backgroundColor: 'var(--color-login-btn)' }}
                  >
                    {loading ? "Creating..." : "Continue"} 
                    {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center font-mono text-xs text-base-content/60">
                Already registered? <button onClick={() => { setIsLogin(true); setError(null); }} className="text-primary hover:brightness-75 font-semibold transition-colors">Login here</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
