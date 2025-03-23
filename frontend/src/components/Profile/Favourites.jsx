import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingItems, setDeletingItems] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async() => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/get-all-favourites", {
        withCredentials: true
      });
      setFavorites(response.data.favorites || []);
      toast.success('Favorites loaded successfully!');
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError(error.response?.data?.message || 'An unexpected error occurred');
      toast.error(error.response?.data?.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (id) => {
    try {
      setDeletingItems(prev => [...prev, id]);
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-book-from-favourite/${id}`, {},
        { withCredentials: true }
      );
      // Update favorites after successful removal
      setFavorites(prevFavorites => prevFavorites.filter(item => item._id !== id));
      toast.success(response.data.message || "Book removed from favorites!");
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to remove favorite");
      toast.error(error.response?.data?.message || "Failed to remove favorite");
    } finally {
      setDeletingItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-200 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="animate-pulse">Loading favorites...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-400 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <div>Error: {error}</div>
    </div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 px-4 sm:px-6 md:px-8 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">My Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[50vh] text-zinc-400 p-8 bg-zinc-800/30 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div className="text-xl font-medium">No favorites found</div>
            <p className="mt-2 text-center text-zinc-500">Books you mark as favorites will appear here</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {favorites.map((item, i) => (
              <div key={i} className="h-full transform hover:scale-105 transition-all duration-300">
                <BookCard 
                  book={item} 
                  favorites={true} 
                  onRemove={handleRemoveFromFavorites}
                  isRemoving={deletingItems.includes(item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favourites