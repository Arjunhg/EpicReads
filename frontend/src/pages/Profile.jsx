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
              // console.log(response.data);
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
    <div className='bg-zinc-900 md:px-12 px-2 flex md:flex-row flex-col h-screen py-8 text-white'>
     {
      !profile && <Loader/>
     }
     {
      profile && (
        <>
          <div className='md:w-1/6 w-full'>
            <Sidebar data={profile}/>
          </div>
          <div className='md:w-5/6 w-full'>
            <Outlet/>
          </div>
        </>
      )
     }
    </div>
  )
}

export default Profile
