import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-purple-400 font-bold text-xl">
        <span className="text-pink-400">✦</span> MyApp
      </Link>
      <div className="flex gap-4 text-sm">
        <Link to="/" className="text-purple-400 hover:underline transition">
          Login
        </Link>
        <Link to="/cadastro" className="text-purple-400 hover:underline transition">
          Cadastro
        </Link>
      </div>
    </nav>
  )
}

export { Navbar }
