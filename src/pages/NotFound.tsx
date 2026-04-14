import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="text-center">
      <p className="text-6xl mb-4 text-brand-accent-light">✦</p>
      <h1 className="text-6xl font-bold text-brand-primary-light mb-3">404</h1>
      <p className="text-gray-400 mb-8">Page not found.</p>

      <Link to="/" className="bg-brand-primary-light hover:bg-brand-primary text-white px-6 py-2 rounded-xl transition">
        Back to home
      </Link>
    </div>
  )
}

export { NotFound }
