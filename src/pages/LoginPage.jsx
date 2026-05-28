import React, { useState, useMemo, useEffect } from "react"
import apiClient from "../api/client"
import { useDispatch } from "react-redux"
import { addUser } from "../store/slices/userSlice"
import { useNavigate } from "react-router-dom"

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
  }, [])

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
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-sm bg-base-100 p-8 rounded-box shadow-lg space-y-5 border border-base-300"
        onSubmit={isLogin ? handleSubmit : signup}
      >
        <h1 className="text-3xl font-bold text-base-content text-center mb-4">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && (
          <div className="alert alert-error text-sm py-2">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {!isLogin && (
          <>
            <div>
              <label className="block mb-2 font-semibold text-base-content">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-3 py-2 border border-base-300 rounded-field focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-base-content">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-3 py-2 border border-base-300 rounded-field focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-base-content">Age</label>
              <input
                type="number"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full px-3 py-2 border border-base-300 rounded-field focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
                placeholder="18"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block mb-2 font-semibold text-base-content">Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="block w-full px-3 py-2 border border-base-300 rounded-field focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-base-content">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-base-300 rounded-field focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content"
            placeholder="••••••••"
            required
          />

          {!isLogin && password.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 h-2 bg-base-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(strength.level / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-semibold whitespace-nowrap ${
                  strength.level <= 2 ? 'text-red-500' : strength.level === 3 ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {strength.label}
                </span>
              </div>

              <div className="space-y-1">
                {PASSWORD_RULES.map((rule, i) => {
                  const passed = rule.test(password)
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={passed ? 'text-green-500' : 'text-base-content/40'}>
                        {passed ? '✓' : '○'}
                      </span>
                      <span className={passed ? 'text-green-500 font-medium' : 'text-base-content/60'}>
                        {rule.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {strength.level < 3 && (
                <p className="text-xs text-red-500 font-medium">Password too weak for signup</p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || (!isLogin && password.length > 0 && strength.level < 3)}
          className="w-full py-2 px-4 text-primary-content bg-primary rounded-field hover:bg-primary/90 transition font-semibold disabled:bg-base-300"
        >
          {loading ? (isLogin ? "Logging in..." : "Creating account...") : (isLogin ? "Login" : "Sign Up")}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin)
          setError(null)
          setPassword("")
        }}
        className="text-primary mt-6 hover:text-primary/80 font-semibold text-center"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  )
}

export default LoginPage
