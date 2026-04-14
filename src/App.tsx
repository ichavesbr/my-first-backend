import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
// import Login from './pages/Login'
// import Register from './pages/Register'
// import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<h1>oi</h1>} />
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/cadastro" element={<Register />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
