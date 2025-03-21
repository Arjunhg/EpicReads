import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
