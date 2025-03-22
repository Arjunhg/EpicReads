import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message/Message';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
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
      const response = await axios.post('http://localhost:3000/api/v1/sign-up', {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        address: formData.address
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess(response.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        address: ''
      })

      // setTimeout(() => window.location.href = '/login', 2000);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Create Account
          </span>
        </h2>

        {/* success and error message */}
        {
          error && <Message type="error" message={error}/>
        }
        {
          success && <Message type="success" message={success}/>
        }

        <form onSubmit={handleSubmit} className='space-y-6'>
          {[
            { label: 'Username', type: 'text', key: 'username' },
            { label: 'Email', type: 'email', key: 'email' },
            { label: 'Password', type: 'password', key: 'password' },
            { label: 'Address', type: 'text', key: 'address' }
          ].map((field) => (
            <div key={field.key}>
              <label className='text-zinc-400 text-sm font-medium block mb-2'>
                {field.label}
              </label>
              <input
                type={field.type}
                className='w-full px-4 py-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300'
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={formData[field.key]}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className='text-zinc-400 text-center mt-6'>
          Already have an account?{' '}
          <Link to="/login" className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
