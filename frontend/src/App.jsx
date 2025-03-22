import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import AllBooks from "./pages/AllBooks"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import BookDetails from "./components/BookDetails/BookDetails"

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/all-books" element={<AllBooks/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/book-details/:id" element={<BookDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
