import React, { useState, useContext } from "react";
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: ""
  });
  const [error, setError] = useState("");  // for validation or API error
  const [success, setSuccess] = useState(""); // for success message
  const { updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // reset error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 6 characters, include one uppercase and one lowercase letter.");
      return;
    }

    // 2️⃣ Confirm passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.userRole) {
      setError("Please select a user role.");
      return;
    }

    try {
      // 3️⃣ API call to backend
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      const user=res.data.user;
      console.log(user.role)
      updateUser(user);
      localStorage.setItem('userToken',res.data.token)
      setSuccess(res.data.message || "Signup successful!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "", userRole: "" });

     if(user.role==='host'){
      navigate('/createEvent')
     }
     else{
      navigate('/')
     }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };
const navigate=useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="text-cyan-100 mt-2">Sign up to join EventHive</p>
          </div>

          <div className="p-8">
            {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
            {success && <div className="mb-4 text-green-600 font-medium">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">User Role</label>
                <select
                  id="userRole"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a role</option>
                  <option value="visitor">Visitor</option>
                  <option value="host">Host</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-semibold hover:from-cyan-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="font-medium text-cyan-600 hover:text-cyan-500 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
