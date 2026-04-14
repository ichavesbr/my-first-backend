import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-brand-primary font-bold text-xl">
        <span className="text-brand-accent-light">✦</span> MyApp
      </Link>
      <div className="flex gap-4 text-sm">
        <Link to="/login" className="text-brand-primary hover:underline transition">
          Login
        </Link>
        <Link to="/cadastro" className="text-brand-primary hover:underline transition">
          Cadastro
        </Link>
      </div>
    </nav>
  )
}

export { Navbar }
