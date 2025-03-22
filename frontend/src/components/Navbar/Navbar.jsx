import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isLoggedIn, isLoading} = useSelector((state) => state.auth); //tells current state of user
  const location = useLocation();

  const links = useMemo(() => {
    const baseLinks = [
      { title: 'Home', link: '/' },
      { title: 'All Books', link: '/all-books' },
      { title: "Cart", link: '/cart' },
      { title: "Profile", link: '/profile' }
    ]
    return isLoggedIn ? baseLinks : baseLinks.slice(0, 2)
  }, [isLoggedIn])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [])

  const isActive = useCallback((path) => {
    if(path==='/' && location.pathname === '/') return true;

    return path !== '/' && location.pathname.startsWith(path);
  }, [location.pathname])

  if (isLoading) {
    return null; // Avoid rendering the navbar until the auth state is determined
  }

  return (
    <div className='bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex items-center'>
            <img 
              className='h-10 w-10 mr-3 inline-block hover:rotate-12 transition-all duration-300'
              src='https://cdn-icons-png.flaticon.com/128/207/207114.png'
              alt='Book Heaven'
            />
            <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Wordstock
            </h1>
          </Link>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='p-2 rounded-md hover:bg-zinc-700'
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className='hidden md:flex items-center gap-6'>
            <div className='flex gap-6'>
              {links.map((item, i) => (
                <Link 
                  to={item.link}
                  className={`cursor-pointer transition-colors duration-300 text-sm font-medium ${isActive(item.link) ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}` }
                  key={i}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {
              isLoggedIn === false && (
                <div className='flex gap-4'>
                  <Link to='/login' className='px-4 py-2 rounded-full text-sm font-medium border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'>
                    Sign In
                  </Link>
                  <Link to='/signup' className='px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                    Sign Up
                  </Link>
                </div>
              )
            }  
          </div>
        </div>

        {/* Mobile menu items */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-4 flex flex-col space-y-3'>
            {links.map((item, i) => (
              <Link 
                to={item.link}
                className={`block w-full py-2 px-3 rounded-md transition-colors duration-300 text-sm font-medium text-center ${
                  isActive(item.link) 
                    ? 'bg-zinc-700 text-blue-400 font-bold' 
                    : 'hover:bg-zinc-700 hover:text-blue-400'
                }`}
                key={i}
              >
                {item.title}
              </Link>
            ))}
            {
              isLoggedIn === false && (
                <div className='flex flex-col space-y-2 mt-2 pt-2 border-t border-zinc-700'>
                  <Link to='/login' className='w-full text-center px-4 py-2 rounded-md text-sm font-medium border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'>
                    Sign In
                  </Link>
                  <Link to='/signup' className='w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                    Sign Up
                  </Link>
                </div>
              )
            }  
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar