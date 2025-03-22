import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='min-h-[85vh] bg-gradient-to-b from-zinc-900 to-zinc-800 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center py-12 lg:py-0'>
        <h1 className="text-4xl lg:text-6xl font-bold text-center lg:text-left">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Discover Your Next
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
            Great Read
          </span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless inspiration 
          in our carefully curated collection of books.
        </p>
        <div className='mt-8 flex gap-4'>
          <Link 
            to="/all-books"
            className='px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105'
          >
            Explore Books
          </Link>
          <button className='px-6 py-3 rounded-full text-sm font-medium border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105'>
            Learn More
          </button>
        </div>
      </div>

      <div className='w-full lg:w-3/6 h-[300px] lg:h-auto flex items-center justify-center p-4 lg:p-12'>
        <div className='relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300'>
          <video
            src="./Vid.mp4"
            autoPlay
            loop
            muted
            className='w-full h-full object-cover rounded-2xl filter brightness-90'
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent'></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
