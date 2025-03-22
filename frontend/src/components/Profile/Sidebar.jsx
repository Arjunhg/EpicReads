import { Link } from 'react-router-dom'
const Sidebar = ({ data }) => {

  return (
    <div className='bg-zinc-800 p-4 rounded-lg h-full flex flex-col items-center justify-between h-full'>

     <div>
        <img
            src = {data.avatar}
            alt = {data.username}
            className='w-24 h-24 rounded-full mx-auto'
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
            {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300">
            {data.email}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
     </div>

      <div className="w-full flex flex-col items-center justify-center">
        <Link
            to='/profile'
            className='text-zinc-100 font-seminold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
            Favourites
        </Link>
        <Link
            to='/profile/orderHistory'
            className='text-zinc-100 font-seminold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
            Order History
        </Link>
        <Link
            to='/profile/settings'
            className='text-zinc-100 font-seminold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
            Settings
        </Link>
      </div>
      <button className='bg-zinc-100 font-semibold text-zinc-900 py-2 px-4 rounded-lg mt-4 hover:bg-zinc-200 transition-all'>
        Logout
      </button>
    </div>
  )
}

export default Sidebar
Sidebar