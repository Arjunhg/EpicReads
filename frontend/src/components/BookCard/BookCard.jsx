import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCard = ({ book, favorites, onRemove, isRemoving }) => {
  const handleRemoveFavorite = async () => {
    if (!book._id) {
      console.error("Book ID is missing");
      toast.error("Book ID is missing");
      return;
    }

    // If the parent component provides an onRemove handler, use it
    if (onRemove) {
      onRemove(book._id);
      return;
    }

    // Legacy implementation for backward compatibility
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-book-from-favourite/${book._id}`, {},
        { withCredentials: true }
      );
      toast.success(response.data.message || "Book removed from favorites!");
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to remove favorite");
      toast.error(error.response?.data?.message || "Failed to remove favorite");
    }
  };

  return (
    <div>
      <Link to={`/book-details/${book._id}`} className="block h-full transform hover:scale-105 transition-all duration-300">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg p-3 sm:p-4 flex flex-col h-full shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-lg flex items-center justify-center p-2 overflow-hidden aspect-[3/4]">
            <img
              src={book.url}
              className='w-full h-full max-h-[180px] object-contain transform hover:scale-110 transition-all duration-500'
              alt={book.title}
            />
          </div>
          <div className="flex-grow flex flex-col mt-3">
            <h2 className='text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold line-clamp-2'>{book.title}</h2>
            <p className="mt-1 text-sm sm:text-base text-zinc-400 font-medium line-clamp-1">by {book.author}</p>
            <p className="mt-auto pt-2 text-lg font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">${book.price}</span>
            </p>
          </div>
        </div>
      </Link>
      {favorites && (
        <div className="mt-2 flex justify-center">
          <button 
            className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
              isRemoving 
                ? 'bg-purple-500/30 text-purple-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
            }`}
            onClick={handleRemoveFavorite}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Removing...
              </span>
            ) : 'Remove from favorites'}
          </button>
        </div>
      )}
    </div>
  )
}

export default BookCard
