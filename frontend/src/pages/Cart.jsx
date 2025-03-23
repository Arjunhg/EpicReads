import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingItems, setDeletingItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const calculatedTotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotal(calculatedTotal.toFixed(2));
    } else {
      setTotal(0);
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'http://localhost:3000/api/v1/get-cart', 
        { withCredentials: true } 
      );
      setCart(res.data.data);
      toast.success('Cart loaded successfully!');
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch cart");
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setDeletingItems(prev => [...prev, id]);
      const res = await axios.put(
        `http://localhost:3000/api/v1/remove-book-from-cart/${id}`, {},
        { withCredentials: true }
      );
      
      // Update cart after successful deletion
      setCart(prevCart => prevCart.filter(item => item._id !== id));
      toast.success(res.data.message || 'Item removed from cart');
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to delete item");
      toast.error(error.response?.data?.message || "Failed to remove item from cart");
    } finally {
      setDeletingItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-200 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <Loader />
    </div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 px-4 sm:px-6 md:px-8 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">My Cart</h1>
        
        {(!cart || cart.length === 0) ? (
          <div className='flex flex-col items-center justify-center min-h-[50vh] text-zinc-400 p-8 bg-zinc-800/30 rounded-lg shadow-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="text-2xl font-medium">Your cart is empty</div>
            <p className="mt-2 text-center text-zinc-500">Add some books to your cart to see them here</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-zinc-800/50 rounded-lg shadow-lg overflow-hidden">
              {cart.map((item, i) => (
                <div 
                  key={i} 
                  className="border-b border-zinc-700 last:border-b-0 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:bg-zinc-700/20 transition-all duration-300"
                >
                  <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black rounded-lg overflow-hidden p-2">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-contain transform hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {item.title}
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">by {item.author}</p>
                    <p className="text-zinc-300 mt-2 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full md:w-auto">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      ${item.price}
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                        deletingItems.includes(item._id) 
                          ? 'bg-red-500/30 text-red-300 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                      onClick={() => deleteItem(item._id)}
                      disabled={deletingItems.includes(item._id)}
                    >
                      {deletingItems.includes(item._id) ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Removing...
                        </span>
                      ) : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl text-zinc-300">Total</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">${total}</span>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
