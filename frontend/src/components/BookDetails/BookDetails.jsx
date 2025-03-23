import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Cart-specific states
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState("");


    // Favorite-specific states
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddingToFavorite, setIsAddingToFavorite] = useState(false);
    const [favoriteMessage, setFavoriteMessage] = useState("");

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/get-book/${id}`);
                setData(response.data.book);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                    setError(error.response.data.message);
                } else {
                    console.log("An unexpected error occurred.");
                    setError("An unexpected error occurred.");
                }
            }
        };
        fetch();
    }, [id]);

    const handleFavourite = async () => {
        setIsAddingToFavorite(true);
        setFavoriteMessage("");
        
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/add-book-to-favourite/${id}`,
                {},
                { withCredentials: true }
            );
            
            setIsFavorite(true);
            setFavoriteMessage(response.data.message);
            toast.success(response.data.message || "Added to favorites successfully!");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to add to favourites";
            setFavoriteMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsAddingToFavorite(false);
        }
    };
    
    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        setCartMessage("");
        
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/add-book-to-cart/${id}`,
                {},
                { withCredentials: true }
            );
            
            setCartMessage(response.data.message);
            toast.success(response.data.message || "Added to cart successfully!");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to add to cart";
            setCartMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsAddingToCart(false);
        }
    };
    
  
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            {!data && (
                <div className="flex justify-center items-center h-[70vh] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
                    <Loader />
                </div>
            )}
            
            {error && (
                <div className="flex justify-center items-center h-[70vh] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
                    <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">{error}</div>
                </div>
            )}
            
            {data && (
                <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 py-8 px-4 md:px-8 lg:px-12 animate-fadeIn'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className="w-full md:w-2/5 lg:w-1/3">
                                <div className='bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl shadow-xl transform hover:scale-[1.01] transition-all duration-300'>
                                    <div className='relative group mb-4'>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                        <img
                                            src={data.url}
                                            alt={data.title}
                                            className='w-full h-[60vh] object-contain rounded-lg relative z-10'
                                        />
                                    </div>
                                    
                                   {
                                    isLoggedIn && role === "user" && (
                                        <div className='flex justify-center gap-4 mt-6'>
                                            <button 
                                                className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer'
                                                onClick={handleFavourite}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer'
                                                onClick={handleAddToCart}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                   }

                                    {
                                        isLoggedIn && role === "admin" && (
                                            <div className='flex justify-center gap-4 mt-6'>
                                                <button className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            
                            <div className="w-full md:w-3/5 lg:w-2/3">
                                <div className='bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 md:p-8 rounded-xl shadow-xl h-full'>
                                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                                        {data.title}
                                    </h1>
                                    
                                    <p className="text-zinc-300 font-medium text-lg mb-6">
                                        by <span className="text-blue-400">{data.author}</span>
                                    </p>
                                    
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-6"></div>
                                    
                                    <div className="mb-6">
                                        <h3 className="text-zinc-300 text-lg font-medium mb-2">Description</h3>
                                        <p className="text-zinc-400 leading-relaxed">
                                            {data.description}
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-zinc-700/30 p-4 rounded-lg">
                                            <span className="text-zinc-400 text-sm block mb-1">Language</span>
                                            <span className="text-white font-medium">{data.language}</span>
                                        </div>
                                        
                                        <div className="bg-zinc-700/30 p-4 rounded-lg">
                                            <span className="text-zinc-400 text-sm block mb-1">Pages</span>
                                            <span className="text-white font-medium">{data.pages || 'Not specified'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-end justify-between mt-auto">
                                        <div>
                                            <span className="text-zinc-400 text-sm block mb-1">Price</span>
                                            <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                                ${data.price}
                                            </span>
                                        </div>
                                        
                                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-[1.03] transition-all duration-300 flex items-center cursor-pointer"
                                            onClick={handleAddToCart}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default BookDetails;
