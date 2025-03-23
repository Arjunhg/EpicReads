import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader';

const Profile = () => {
  const [profile, setProfile] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetch = async() => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-user-information", {
          withCredentials: true
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || 'An unexpected error occurred');
      }
    }
    if (isLoggedIn) {
      fetch();
    }
  }, [isLoggedIn]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 py-8 px-4 md:px-8 lg:px-12'>
      {!profile && (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      )}
      
      {profile && (
        <div className='max-w-7xl mx-auto bg-zinc-800/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm'>
          <div className='flex flex-col md:flex-row animate-fadeIn'>
            <div className='md:w-1/4 lg:w-1/5 p-3'>
              <div className='h-full transform hover:scale-[1.01] transition-all duration-300'>
                <Sidebar data={profile} />
              </div>
            </div>
            <div className='md:w-3/4 lg:w-4/5 p-3 md:p-6'>
              <div className='bg-zinc-800/70 rounded-xl h-full p-4 md:p-6 shadow-md transition-all duration-300'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
