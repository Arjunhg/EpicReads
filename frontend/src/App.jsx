import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import BookDetails from "./components/BookDetails/BookDetails";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';
import axios from 'axios';
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";

const App = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(authActions.setLoading(true)); // Start loading
        const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
          withCredentials: true
        });

        if (response.data.user) {
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.user.role));
        } else {
          dispatch(authActions.logout());
        }
      } catch (error) {
        dispatch(authActions.logout());
      } finally {
        dispatch(authActions.setLoading(false)); // Stop loading
      }
    };

    fetchUser();
  }, [dispatch]);

  if (isLoading) {
    // Show a loading spinner or placeholder while authentication is being checked
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-books" element={<AllBooks />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/cart" element={isLoggedIn ? <Cart /> : <Login />} />
          <Route exact path="/profile" element={isLoggedIn ? <Profile /> : <Login />}>
            <Route index element={<Favourites/>}/>
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
            <Route path="/profile/settings" element={<Settings/>}/>
          </Route>
          <Route exact path="/book-details/:id" element={<BookDetails />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
