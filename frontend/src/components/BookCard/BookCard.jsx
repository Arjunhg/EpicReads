import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({book}) => {
  return (
    <Link to={`/book-details/${book._id}`} className="block transform hover:scale-105 transition-all duration-300">
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg p-4 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-lg flex items-center justify-center p-2 overflow-hidden">
          <img
            src={book.url}
            className='h-[25vh] object-contain transform hover:scale-110 transition-all duration-500'
            alt={book.title}
          />
        </div>
        <h2 className='mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold truncate'>{book.title}</h2>
        <p className="mt-2 text-zinc-400 font-medium">by {book.author}</p>
        <p className="mt-2 text-lg font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">${book.price}</span>
        </p>
      </div>
    </Link>
  )
}

export default BookCard
