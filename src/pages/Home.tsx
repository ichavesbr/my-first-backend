import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="text-center max-w-lg">
      <p className="text-6xl mb-4 text-brand-accent-light">✦</p>
      <h1 className="text-4xl font-bold text-brand-primary mb-3">Bem-vindo ao MyApp</h1>
      <p className="text-gray-400 mb-8">Uma plataforma simples, bonita e fácil de usar.</p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/login"
          className="bg-brand-primary-light hover:bg-brand-primary text-white px-6 py-2 rounded-xl transition">
          Entrar
        </Link>
        <Link
          to="/cadastro"
          className="bg-brand-accent-light hover:bg-brand-accent text-white px-6 py-2 rounded-xl transition">
          Cadastrar
        </Link>
      </div>
    </div>
  )
}
export { Home }
