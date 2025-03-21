import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      title: "Home",
      link: '/'
    },
    {
      title: "About",
      link: '/about'
    },
    {
      title: "All Books",
      link: '/all-books'
    }, 
    {
      title: "Cart",
      link: '/cart'
    }, 
    {
      title: "Profile",
      link: '/profile'
    }
  ]

  return (
    <div className='bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img 
              className='h-10 w-10 mr-3 inline-block hover:rotate-12 transition-all duration-300'
              src='https://cdn-icons-png.flaticon.com/128/207/207114.png'
              alt='Book Heaven'
            />
            <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Wordstock
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                <div 
                  className='hover:text-blue-400 cursor-pointer transition-colors duration-300 text-sm font-medium' 
                  key={i}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <div className='flex gap-4'>
              <button className='px-4 py-2 rounded-full text-sm font-medium border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'>
                Sign In
              </button>
              <button className='px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu items */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-4'>
            {links.map((item, i) => (
              <div 
                className='px-2 py-2 hover:bg-zinc-700 rounded-md cursor-pointer transition-colors duration-200' 
                key={i}
              >
                {item.title}
              </div>
            ))}
            <div className='flex flex-col gap-2 mt-4'>
              <button className='px-4 py-2 rounded-md text-sm font-medium border border-blue-500 hover:bg-blue-500 transition-all duration-300'>
                Sign In
              </button>
              <button className='px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300'>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar