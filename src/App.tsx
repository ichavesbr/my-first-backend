import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { NotFound } from "./pages/NotFound"
import { Home } from "./pages/Home"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// Todo list:
// config dns
// implement TanStack Form (handle form) + Zod (form validation)
// implement zustand (state manage)
// implement routes protection
// implement unit test
