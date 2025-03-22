import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {

    // get recent added books: limit 4 from backend book.routes.js
    const [data, setData] = useState();

    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
            setData(response.data.books);
        }
        fetch();
    }, []);

  return (
    <div className='mt-8 px-4 max-w-7xl mx-auto'>

      <h4 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Recently Added
        </span>
      </h4>

      {!data && <Loader />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data && data.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyAdded
