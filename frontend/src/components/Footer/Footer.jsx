import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center md:text-left'>
            <h2 className='text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Wordstock
            </h2>
            <p className='text-zinc-400 text-sm'>
              Your premier destination for books and literature.
            </p>
          </div>
          
          <div className='text-center'>
            <div className='flex justify-center gap-6'>
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <div key={social} className='hover:text-blue-400 cursor-pointer transition-colors duration-300'>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className='text-center md:text-right'>
            <p className='text-zinc-400 text-sm'>
              &copy; {new Date().getFullYear()} Wordstock.<br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
