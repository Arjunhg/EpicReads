import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';

const AllBooks = () => {
  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  useEffect(() => {
      const fetch = async() => {
          const response = await axios.get("http://localhost:3000/api/v1/get-all-books");
          setData(response.data.books);
      }
      fetch();
  }, []);

  const filteredBooks = data?.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || book.category === selectedCategory)
  );

  const sortedBooks = filteredBooks?.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Explore Our Collection
            </span>
          </h1>
          
          {/* Search and Filter Section */}
          <div className='flex flex-col md:flex-row gap-4 items-center justify-center mb-8'>
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 rounded-full bg-zinc-700/50 border border-zinc-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full bg-zinc-700/50 border border-zinc-600 text-white focus:outline-none"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {!data && <Loader />}

        {data && (
          <>
            <p className="text-zinc-400 mb-6">
              Showing {sortedBooks?.length || 0} books
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {sortedBooks?.map((book, i) => (
                <div 
                  key={i}
                  className="opacity-0 animate-fade-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {sortedBooks?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">No books found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AllBooks;