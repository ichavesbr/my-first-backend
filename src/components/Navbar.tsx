import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-purple-400 font-bold text-xl">
        ✦ MyApp
      </Link>
      <div className="flex gap-4 text-sm">
        <Link to="/" className="text-gray-500 hover:text-purple-400 transition">
          Login
        </Link>
        <Link to="/cadastro" className="text-gray-500 hover:text-pink-400 transition">
          Cadastro
        </Link>
      </div>
    </nav>
  )
}

export { Navbar }
