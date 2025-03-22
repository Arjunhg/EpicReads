import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message/Message';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

const Login = () => {

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/sign-in', {
        username: formData.username.trim(),
        password: formData.password.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      const { id, role } = response.data;

      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));

      setSuccess('Login successful! Redirecting...');

      setTimeout(() => navigate('/profile'), 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Welcome Back
          </span>
        </h2>

        {error && <Message type="error" message={error} />}
        {success && <Message type="success" message={success} />}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='text-zinc-400 text-sm font-medium block mb-2'>Username</label>
            <input
              type="text"
              className='w-full px-4 py-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300'
              placeholder='Enter your username'
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className='text-zinc-400 text-sm font-medium block mb-2'>Password</label>
            <input
              type="password"
              className='w-full px-4 py-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300'
              placeholder='Enter your password'
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-zinc-400 text-center mt-6'>
          Don't have an account?{' '}
          <Link to="/signup" className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
