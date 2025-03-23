import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [value, setValue] = useState({address: ""});
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async() => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/get-user-information", {
        withCredentials: true
      });
      setProfileData(response.data);
      setValue({address: response.data.address || ""});
      toast.success("Profile loaded successfully!");
    } catch (error) {
      console.error(error.response?.data?.message || 'An unexpected error occurred');
      toast.error(error.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  const change = (e) => {
    const {name, value} = e.target
    setValue(prev => ({...prev, [name]: value}));
  }

  const submitAddress = async() => {
    try {
      setUpdating(true);
      const response = await axios.put(
        "http://localhost:3000/api/v1/update-address", 
        { address: value.address }, 
        { withCredentials: true }
      );
      toast.success(response.data.message || "Address updated successfully!");
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to update address');
      toast.error(error.response?.data?.message || 'Failed to update address');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-200 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 px-4 sm:px-6 md:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Profile Settings
        </h1>

        <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-zinc-400 text-sm font-medium">Username</label>
              <div className="p-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-zinc-100 font-medium transition-all duration-300 hover:bg-zinc-700">
                {profileData.username}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-zinc-400 text-sm font-medium">Email</label>
              <div className="p-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-zinc-100 font-medium transition-all duration-300 hover:bg-zinc-700 truncate">
                {profileData.email}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label className="block text-zinc-400 text-sm font-medium">Shipping Address</label>
            <textarea
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={value.address}
              rows="4"
              placeholder="Enter your shipping address"
              name="address"
              onChange={change}
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                updating 
                  ? 'bg-yellow-500/30 text-yellow-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
              }`}
              onClick={submitAddress}
              disabled={updating}
            >
              {updating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Update Address'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
