import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Sidebar = ({ data }) => {
  const location = useLocation();
  const [isHovering, setIsHovering] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const links = [
    { path: '/profile', label: 'Favorites' },
    // { path: '/profile/orderHistory', label: 'Order History' },
    { path: '/profile/settings', label: 'Settings' }
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3000/api/v1/logout', {}, { withCredentials: true });

        dispatch(authActions.logout()); 
        navigate('/'); 
    } catch (error) {
        console.error("Logout failed:", error.response?.data?.message || "Something went wrong");
    }
};

  return (
    <div className='bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg h-full flex flex-col p-5'>
      <div className='flex flex-col items-center mb-6'>
        <div className='relative group'>
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md transition-opacity duration-300 ${
              isHovering ? 'opacity-70' : 'opacity-0'
            }`}
          ></div>
          <img
            src={data.avatar}
            alt={data.username}
            className='w-24 h-24 rounded-full object-cover border-2 border-blue-400 relative z-10 transition-transform duration-300 hover:scale-105'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        </div>
        <h3 className="mt-4 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {data.username}
        </h3>
        <p className="mt-1 text-sm text-zinc-300">
          {data.email}
        </p>
        <div className="w-full mt-6 h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
      </div>

      <div className="w-full flex flex-col items-center space-y-2 flex-grow mb-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-zinc-100 font-medium w-full py-2.5 px-4 text-center rounded-lg transition-all duration-300 ${
              isActive(link.path)
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-500'
                : 'hover:bg-zinc-700/50 hover:scale-[1.02] transform'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      <button 
        className='cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center'
        onClick={handleLogout}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  )
}

export default Sidebar