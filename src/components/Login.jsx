import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age
        },
        { withCredentials: true }
      );
      console.log(res.data.data);

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-5 border border-gray-200"
        onSubmit={isLogin ? handleSubmit : signup}
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && (
          <div className="alert alert-error text-sm py-2 text-red-800">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {!isLogin && (
          <>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Age</label>
              <input 
                type="number"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="18"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
        >
          {loading ? (isLogin ? "Logging in..." : "Creating account...") : (isLogin ? "Login" : "Sign Up")}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError(null);
        }}
        className="text-blue-600 mt-6 hover:text-blue-800 font-semibold text-center"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Login;
