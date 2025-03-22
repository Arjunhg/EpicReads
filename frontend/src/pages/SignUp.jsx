import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Create Account
          </span>
        </h2>

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
            className='w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 transform hover:scale-[1.02]'
          >
            Sign Up
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
