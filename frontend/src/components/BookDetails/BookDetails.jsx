import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'

const BookDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    
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
    }, []);
    
  

  return (
    <>
        {
            data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
                    <div className="bg-zinc-800 rounded p-4 h-[88vh] w-full lg:w-[50%] flex items-center justify-center">
                        <img
                            src={data.url}
                            alt='/'
                            className='h-[70vh] rounded-md object-contain'
                        />
                    </div>
                    <div className="p-4 w-[3/6]">
                        <h1 className="text-4xl text-zinc-300 font-semibold">
                            {data.title}
                        </h1>
                        <p className="text-zinc-400 mt-1">
                            by {data.author}
                        </p>
                        <p className="text-zinc-500 mt-4 text-xl">
                            {data.description}
                        </p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            Language: {data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: ${data.price}
                        </p>
                    </div>
                </div>
            )
        }
        {
            !data && <Loader/>
        }
    </>
  )
}

export default BookDetails
