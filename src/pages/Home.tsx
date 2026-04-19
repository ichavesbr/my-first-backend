import { Link } from "react-router-dom"

const SigninStyle = "bg-brand-primary-light hover:bg-brand-primary text-white px-6 py-2 rounded-xl transition"
const SignupStyle = "bg-brand-accent-light hover:bg-brand-accent text-white px-6 py-2 rounded-xl transition"

const Home = () => {
  return (
    <div className="text-center max-w-lg">
      <p className="text-6xl mb-4 text-brand-accent-light">✦</p>
      <h1 className="text-4xl font-bold text-brand-primary mb-3">Welcome to MyApp</h1>
      <p className="text-gray-400 mb-8">A simple, beautiful and easy-to-use platform.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/login" className={SigninStyle}>
          Sign In
        </Link>
        <Link to="/register" className={SignupStyle}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
export { Home }
