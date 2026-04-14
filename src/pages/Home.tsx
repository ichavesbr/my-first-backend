import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="text-center max-w-lg">
      <p className="text-6xl mb-4 text-pink-400">✦</p>
      <h1 className="text-4xl font-bold text-purple-400 mb-3">Bem-vindo ao MyApp</h1>
      <p className="text-gray-400 mb-8">Uma plataforma simples, bonita e fácil de usar.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/login" className="bg-purple-300 hover:bg-purple-400 text-white px-6 py-2 rounded-xl transition">
          Entrar
        </Link>
        <Link to="/cadastro" className="bg-pink-300 hover:bg-pink-400 text-white px-6 py-2 rounded-xl transition">
          Cadastrar
        </Link>
      </div>
    </div>
  )
}
export { Home }
